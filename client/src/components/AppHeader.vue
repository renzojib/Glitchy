<template lang="">
    <nav class="bar">
      <a class="logo" @click="navigateTo"><img src="@/assets/logo.png" /></a>
      <div>
        <select v-model="language">
          <option v-for="language in $store.getters.languages" :value="language.iso_639_1" :key="language.iso_639_1">{{language.iso_639_1}}</option>
        </select>
      </div>
        <!-- <img :src="require('@/assets/menu.png')" alt="menu" v-if="isMobile" class="nav-img"/> -->
    </nav>
</template>
<script>
export default {
    data: () => ({ language: localStorage.getItem('language')}),

    watch: {
      language: async function (newValue) {
        await this.$store.commit('setLanguage', newValue)
        this.$router.go()
      }
    },

    beforeUnmount () {
      if (typeof window === 'undefined') return

      window.removeEventListener('resize', this.onResize, { passive: true })
    },

    mounted () {
      this.$store.dispatch('getLanguages')
      this.onResize()
      window.addEventListener('resize', this.onResize, { passive: true })
    },

    methods: {
      onResize () {
        this.isMobile = window.innerWidth < 960
      },
      navigateTo () {
        this.$router.push({name: 'home'})
      }
    },
}
</script>
<style scoped>
@import "@/styles/AppHeader.css";    
</style>