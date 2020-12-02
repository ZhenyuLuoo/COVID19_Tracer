<template>
  <ul>
    <case
      v-for="data in cases"
      :key="data.name"
      :data="data"
      :on-delete="onDelete"
      :on-modify="onModify"
    ></case>
  </ul>
  <base-card v-if="cases !== null && cases.length > 0">
    <p>Total: {{ cases.length }} cases.</p>
  </base-card>
  <!-- when loading cases -->
  <base-card v-if="cases == null">
    <h2>Loading ...</h2>
  </base-card>
  <!-- when no cases presents -->
  <base-card v-if="cases !== null && cases.length <= 0">
    <h2>No matched cases found</h2>
  </base-card>
</template>

<script>
import Case from './Case.vue';

export default {
  name: 'case-list',

  props: ['cases', 'onDelete', 'onModify'],

  components: {
    Case
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: auto;
  max-width: 70rem;
}
</style>
