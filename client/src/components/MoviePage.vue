<template lang="">
    <div class="view-movie">
        <img v-if="!show" />
        <img v-if="show" :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"/>
        <h1 v-if="show">
            {{movie.title}}
        </h1>
        <p v-if="show">{{movie.overview}}</p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            show: true,
            timer: "",
            movie: "",
        }
    },
    mounted () {
        if(!this.$store.getters.id) {
            this.$router.push({ name:'home' })
        }
        this.getMovieInfo()
    },
    beforeUnmount() {
        clearTimeout(this.timer)
    },
    methods: {
        async getMovieInfo () {
            const movie = await this.$store.dispatch('getRandom')
            this.movie = await this.$store.dispatch('getMovieInfo', movie)
        }
    }
}
</script>
<style scoped>
@import "@/styles/MoviePage.css";
</style>