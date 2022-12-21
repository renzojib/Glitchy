<template>
  <div>
    <AppHeader/>
    <main>
      <router-view :key="$route.fullPath"/>
    </main>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader"
export default {
  name: 'App',
  components: {
    AppHeader
  },
  data: () => ({
    //
  }),
}
</script>
<style>
/* @import "~bulma/css/bulma.css"; */
@import "@/styles/reset.css";

body {
  background-color: rgb(224, 232, 239);
}

/* div {
  background-image: url("@/assets/background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100vw;
  height: 50vh;
} */
</style>
