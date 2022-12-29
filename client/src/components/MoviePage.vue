<template lang="">
    <div ref="view" class="view-movie" :class="{ 'v-height': !show}">
        <div v-if="!show" class="load-container">
            <div class="load"></div>
        </div>
        <img v-if="show" :src="movieImg" alt="Unfortunately this movie image is missing"/>
        <h1 v-if="show">
            {{movie.title}}
        </h1>
        <p v-if="show">{{movie.overview}}</p>
        <div>
            <button v-if="show" @click="getMovieInfo">Next Choice</button>
            <button v-if="show" @click="pushToHome">Change genre</button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            show: false,
            timer: "",
            movie: "",
        }
    },
    computed: {
        movieImg () {
            return 'https://image.tmdb.org/t/p/original/' + this.movie.poster_path
        }
    },
    created: async function () {
        await this.$store.dispatch('getMovies')
        await this.getMovieInfo()
        setTimeout(() => {
            this.show = true
        },3000)
    },
    methods: {
        async getMovieInfo () {
            const movie = await this.$store.dispatch('getRandom')
            this.movie = await this.$store.dispatch('getMovieInfo', movie)
        },
        pushToHome () {
            this.$router.push({ name:'home' })
        },
    }
}
</script>
<style scoped>
@import "@/styles/MoviePage.css";
</style>