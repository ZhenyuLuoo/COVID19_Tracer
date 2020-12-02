<template>
  <!-- search form TODO beautify -->
  <base-card class="search-box">
    <label for="search"></label>
    <input id="search" v-model="keyword" class="search-text" name="search" placeholder="Search..." type="search">
    <label for="search-by"></label>
    <select id="search-by" v-model="searchBy" class="search-type">
      <option v-bind:value="'name'">by Name</option>
      <option v-bind:value="'id'">by ID</option>
    </select>
    <base-button class="search-btn" @click="onSearch">Search</base-button>
  </base-card>
  <!-- search result -->
  <case-list v-if="showResult" :cases="result"></case-list>
  <!-- search dialog -->
  <base-dialog v-if="popupInvalidInput" title="Invalid Input" @close="closePopupInvalidInput">
    <template #default>
      <p>Search keywords cannot be empty!</p>
    </template>
    <template #actions>
      <base-button @click="closePopupInvalidInput">Ok</base-button>
    </template>
  </base-dialog>
</template>

<script>
import CaseList from '@/components/confirmed-case/CaseList';
import { searchById, searchByName } from '@/api/case';

export default {
  data() {
    return {
      result: null,
      popupInvalidInput: false,
      keyword: '',
      searchBy: 'name',
      showResult: false
    };
  },

  methods: {
    closePopupInvalidInput() {
      this.popupInvalidInput = false;
    },

    onSearch() {
      if (this.keyword.length <= 0) {
        this.popupInvalidInput = true;
        return;
      }
      // Search logic
      this.showResult = true;
      this.result = null;
      if (this.searchBy === 'name') {
        searchByName(this.keyword)
          .then(data => this.result = data)
          .catch(reason => {
            alert(reason);
            this.showResult = false;
          });
      } else if (this.searchBy === 'id') {
        searchById(this.keyword)
          .then(data => this.result = data)
          .catch(reason => {
            alert(reason);
            this.showResult = false;
          });
      }
    }
  },

  components: { CaseList }
};
</script>

<style scoped>
input,
textarea,
select {
  width: 50%;
  font: inherit;
  padding: 0.15rem;
  background-color: #fff;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.search-box {
  display: table;
  width: 100%;
}

.search-text {
  display: table-cell;
  width: 70%;
  height: 40px;
  border-radius: 4px 0 0 4px;
}

.search-type {
  display: table-cell;
  width: 15%;
  height: 40px;
}

.search-btn {
  display: table-cell;
  width: 15%;
  height: 40px;
  border-radius: 0 4px 4px 0;
}
</style>
