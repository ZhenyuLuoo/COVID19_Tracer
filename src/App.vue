<template>
  <the-header title="COVID-19 Tracer"></the-header>
  <the-navigator></the-navigator>
  <router-view />
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader';
import TheNavigator from '@/components/layouts/TheNavigator';

export default {

  components: {
    TheHeader,
    TheNavigator
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
