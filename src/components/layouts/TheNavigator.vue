<template>
  <base-card>
    <!-- create button for each path -->
    <router-link
      v-for="route in routes"
      :key="route.path"
      v-slot="{ navigate, isActive }"
      :to="route.path"
    >
      <base-button :mode="isActive ? null : 'flat'" @click="navigate">{{ route.name }}</base-button>
    </router-link>
  </base-card>
</template>

<script>
export default {
  name: 'the-navigator',
  computed: {
    routes() {
      // Get all available routes
      return this.$router.options.routes.filter(route => !(route.meta && route.meta.hidden));
    }
  }
};
</script>

<style scoped>

</style>
