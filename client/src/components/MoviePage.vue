<template lang="">
    <h1>
        {{$store.getters.movie.title}}
    </h1>
    <img :src="poster"/>
    <p>{{$store.getters.movie.overview}}</p>
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
<style lang="">
    
</style>