<template lang="">
    <nav class="" :class="{'justify-end': isMobile, 'justify-start': !isMobile }">
        <div class="" v-if="!isMobile">
            <a class="">Glitchy</a>
            <a class="">Find Movie</a>
        </div>
        <img src="" alt="menu" v-if="isMobile" class="navig-m"/>
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
    },
}
</script>
<style scoped>
    
</style>