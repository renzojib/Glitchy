<template lang="">
    <nav :class="{'justify-end': isMobile, 'justify-start': !isMobile, 'glitchy-find': isMobile }">
        <div class="glitchy-find">
            <a class="logo" @click="navigateTo">Home</a>
        </div>
        <!-- <img :src="require('@/assets/menu.png')" alt="menu" v-if="isMobile" class="nav-img"/> -->
    </nav>
</template>
<script>
export default {
    data: () => ({ isMobile: false}),

    beforeUnmount () {
      if (typeof window === 'undefined') return

      window.removeEventListener('resize', this.onResize, { passive: true })
    },

    mounted () {
      this.onResize()

      window.addEventListener('resize', this.onResize, { passive: true })
    },

    methods: {
      onResize () {
        this.isMobile = window.innerWidth < 960
      },
      navigateTo () {
        this.$router.go()
      }
    },
}
</script>
<style scoped>
@import "@/styles/AppHeader.css";    
</style>