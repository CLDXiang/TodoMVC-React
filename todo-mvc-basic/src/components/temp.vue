<template>
  <div class="timetable__search-bar">
    <v-text-field
      ref="textfield"
      v-model="searchText"
      label="搜索课程"
      hint="可通过课程名、课程号、教师名、院系、时间地点搜索"
      outlined
      dense
      :disabled="isLoadingSearchResults"
      :success-messages="searchBarStatus === 'success' ? `找到 ${searchResults.length} 门课程` : []"
      :error-messages="searchBarStatus === 'error' ? '没有找到符合条件的课程' : []"
      class="search-bar__text-field"
      @keydown="handleKeyDown"
    >
      <template #append>
        <v-fab-transition>
          <v-btn
            v-show="searchText !== ''"
            color="blue"
            fab
            dark
            x-small
            absolute
            right
            :loading="isLoadingSearchResults"
            class="search-bar__search-button"
            @click="handleClickSearchButton"
          >
            <v-icon>search</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
    </v-text-field>
    <v-btn v-show="searchResults.length !== 0" class="results-visible-button" @click="handleChangeResultsVisible">
      <v-icon left style="color: #000">{{ isSearchResultsVisible ? 'unfold_less' : 'unfold_more' }}</v-icon>
      {{ isSearchResultsVisible ? '收起搜索结果' : '展开搜索结果' }}
    </v-btn>
    <v-scroll-y-transition>
      <div v-show="isSearchResultsVisible && searchResults.length !== 0" class="search-bar__results">
        <div
          v-for="item in searchResults"
          :key="item.courseID"
          class="search-bar__result"
          @click.stop="handleClickSearchResult(item.courseID)"
        >
          <div class="result-line">
            {{ `${item.codeID} ${item.name}` }}
          </div>
          <div class="result-line cut">
            {{ item.teachers }}
          </div>
          <div v-for="(ts, tsIndex) in item.timeSlots.slice(0, 3)" :key="tsIndex" class="result-line">
            {{ ts }}
          </div>
          <div v-if="item.timeSlots.length > 3" class="result-line">
            ……
          </div>
        </div>
      </div>
    </v-scroll-y-transition>
  </div>
</template>

<script>
export default {
  props: {
    searchIndex: Array,
  },
  data() {
    return {
      searchText: '',
      isSearchResultsVisible: false,
      /** 搜索结果
       * TODO: 后续可能还需要在 value 中加入一些状态：是否已选等
       */
      searchResults: [],
      isLoadingSearchResults: false,
      searchBarStatus: 'normal',
    };
  },
  watch: {
    searchText(newVal) {
      const query = newVal.trim();
      if (this.searchBarStatus !== '') {
        this.searchBarStatus = '';
      }
      if (this.searchResults.length > 0) {
        this.searchResults = [];
      }
      if (!query || query === '') {
        this.isSearchResultsVisible = false;
      }
    },
  },
  methods: {
    handleChangeResultsVisible() {
      this.isSearchResultsVisible = !this.isSearchResultsVisible;
    },
    handleClickSearchResult(courseID) {
      this.$emit('addcourse', courseID);
    },
    handleClickSearchButton() {
      this.isLoadingSearchResults = true;

      // 防止还未渲染 loading 状态就卡住
      setTimeout(() => {
        const query = this.searchText.trim();
        if (!query || query === '') {
          this.isSearchResultsVisible = false;
          return;
        }

        const reg = new RegExp(query, 'i');

        this.searchResults = this.searchIndex.filter(({ index }) => reg.test(index));
        if (this.searchResults.length > 0) {
          this.searchBarStatus = 'success';
          this.showMessage(`找到 ${this.searchResults.length} 门课程`, 'success');
          // 主要针对移动端，使键盘收回
          this.$refs.textfield.blur();
        } else {
          this.searchBarStatus = 'error';
          this.showMessage('没有找到符合条件的课程', 'error');
        }

        this.isLoadingSearchResults = false;
        this.isSearchResultsVisible = true;
      }, 0);
    },
    handleKeyDown(e) {
      // TODO: 如何在移动端监听键盘“完成”按钮？
      // 监听回车键
      if (e.which === 13) {
        this.handleClickSearchButton();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_timetable';

.timetable__search-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  position: relative;
  min-width: 320px;
  height: $search-bar-height;

  flex: 1;
  display: flex;

  > .search-bar__text-field {
    position: relative;
    flex: 0;
  }
}

.search-bar__search-button {
  margin-top: -4px;
}

.search-bar__results {
  $top-height: 66px + 36px;

  position: absolute;
  top: $top-height;
  width: 100%;

  // max-height: 13.5rem;
  height: $search-bar-height - $top-height;
  border: 1px solid #d3d6db;
  border-top: 0;
  border-radius: 0 0 0.25rem 0.25rem;
  background-color: #fff;

  overflow: auto;
}

.search-bar__result {
  box-sizing: border-box;
  cursor: pointer;

  padding: 0.6rem 0.5rem;
  font-size: 0.9rem;
  color: #69707a;

  &:hover,
  &.hover {
    background-color: #f3f5f8;
  }
}

.result-line.cut {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
