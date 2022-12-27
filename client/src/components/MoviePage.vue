<template lang="">
    <div class="view-movie">
        <img v-if="show" :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"/>
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
            show: true,
            timer: "",
            movie: "",
        }
    },
    created () {
        this.show = false
        this.getMovieInfo()
    },
    methods: {
        async getMovieInfo () {
            const movie = await this.$store.dispatch('getRandom')
            console.log(movie)
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