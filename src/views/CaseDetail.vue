<template>
  <!--Show case list-->
  <case-list :cases="cases"></case-list>
</template>

<script>
import CaseList from '@/components/confirmed-case/CaseList';
import { getAll } from '@/api/case';

export default {
  data() {
    return {
      cases: null
    };
  },

  mounted: function() {
    this.loadCases();
  },

  methods: {
    loadCases() {
      getAll().then(data => {
        this.cases = data;
      }).catch(reason => {
        alert(reason);
      });
    }
  },

  components: { CaseList }
};
</script>

<style>
</style>
