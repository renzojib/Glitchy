<template lang="">
    <div class="view-movie">
        <img :src="poster"/>
        <h1>
            {{$store.getters.movie.title}}
        </h1>
        <p>{{$store.getters.movie.overview}}</p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            poster: ""
        }
    },
    created () {
        if (this.$store.getters.movie === "") {
            this.$router.replace({name: 'home'})
        } else {
            this.poster = `https://image.tmdb.org/t/p/original/${this.$store.getters.movie.poster_path}`
        }
    }
}
</script>
<style scoped>
@import "@/styles/MoviePage.css";
</style>