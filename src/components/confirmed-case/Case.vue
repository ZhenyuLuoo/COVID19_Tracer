<template>
  <li>
    <base-card>
      <header>
        <h3>{{ data.name }}</h3>
        <!--Operation Buttons-->
        <div>
          <base-button
            v-if="onModify !== undefined"
            @click="onModify(data)"
          >
            Modify
          </base-button>
          <base-button
            v-if="onDelete !== undefined"
            @click="onDelete(data)"
          >
            Delete
          </base-button>
        </div>
      </header>
      <span>ID: {{ data.case_id }} &nbsp; &nbsp;</span>
      <span>Age: {{ data.age }} &nbsp; &nbsp;</span>
      <span>Gender: {{ data.gender }} &nbsp; &nbsp;</span>
      <span>Date: {{ data.date }}</span>
      <p>Description: {{ data.description }}</p>
    </base-card>
  </li>
</template>

<script>
export default {
  name: 'case',
  props: ['data', 'onDelete', 'onModify']
};
</script>

<style scoped>
li {
  margin: auto;
  max-width: 70rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: #ce5c00;
}

a:hover,
a:active {
  color: #c89300;
}
</style>
