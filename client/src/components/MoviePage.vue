<template lang="">
    <div class="view-movie">
        <img v-if="showImg" :src="poster"/>
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
            poster: "",
            showImg: true,
        }
    },
    created () {
        if (this.$store.getters.movie === "") {
            this.showImg = false
        } else {
            this.poster = `https://image.tmdb.org/t/p/original/${this.$store.getters.movie.poster_path}`
        }
    }
}
</script>
<style scoped>
@import "@/styles/MoviePage.css";
</style>