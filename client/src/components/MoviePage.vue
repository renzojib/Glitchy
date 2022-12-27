<template lang="">
    <div class="view-movie">
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
    created () {
        this.show = false
        if (this.$store.getters.id) {
            this.getMovieInfo()
        } 
    },
    beforeCreate () {
        if (!this.$store.getters.id) {
            this.$router.push({ name:'home' })
        }
    },
    methods: {
        async getMovieInfo () {
            const movie = await this.$store.dispatch('getRandom')
            this.movie = await this.$store.dispatch('getMovieInfo', movie)
            this.show = true
        },

        pushToHome () {
            if(!this.$store.getters.id) {
                console.log(2)
              this.$router.push({ name:'home' })
            }
        }
    }
}
</script>
<style scoped>
@import "@/styles/MoviePage.css";
</style>