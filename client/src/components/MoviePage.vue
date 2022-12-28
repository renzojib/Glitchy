<template lang="">
    <div class="view-movie">
        <img v-if="show" :src="movieImg"/>
        <h1 v-if="show">
            {{movie.title}}
        </h1>
        <p v-if="show">{{movie.overview}}</p>
        <div>
            <button @click="getMovieInfo">Next Choice</button>
            <button @click="pushToHome">Change genre</button>
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
            page: 10,
        }
    },
    computed: {
        movieImg () {
            return 'https://image.tmdb.org/t/p/original/' + this.movie.poster_path
        }
    },
    created: async function () {
        await this.$store.dispatch('getMovies', localStorage.getItem('id'), this.page)
        this.getMovieInfo()
        this.show = true
    },
    methods: {
        randomPage () {
            return Math.floor(Math.random() * this.page)
        },
        async getMovieInfo () {
            const movie = await this.$store.dispatch('getRandom')
            this.movie = await this.$store.dispatch('getMovieInfo', movie)
            this.show = true
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