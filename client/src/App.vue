<template>
  <div>
    <AppHeader/>
    <main>
      <router-view/>
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
