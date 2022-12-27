<template>
  <div class="home-page">
    <h1 ref="testing" class="">Let Glitchy Choose</h1>
    <div class="forms">
      <select v-model="id" class="">
        <option v-for="genre in $store.getters.genres" :value="genre.id" :key="genre.id">{{genre.name}}</option>
      </select>
      <button @click="goToMovie">Random Movie</button>
    </div>
    <div class="movies">
      <div class="movie-div" v-for="movie in movies" :key="movie.id">
        <img :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"/>
        <h1>
          {{movie.title}}
        </h1>
        <p>{{movie.overview}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    id: "",
    page: 10,
    movies: [],
  }),
  watch: {
    id: async function (value) {
      this.$store.commit('setId', this.id)
      await this.$store.dispatch('getMovies', value, this.page)
      this.getMoviesInfo()
    }
  },
  mounted () {
    this.$store.dispatch('getGenres')
  },
  methods: {
    goToMovie () {
      this.$router.push({name: 'movie'})
    },
    async getUniqueMovies () {
      let movies = {}
      let count = 0
      while (count < 2) {
        if (count === 0) {
          let movie = await this.$store.dispatch('getRandom')
          movies[movie.id] = movie
          count++
        } else {
          let movie = await this.$store.dispatch('getRandom')
          if (movies[movie.id]) {
            continue
          } else {
            movies[movie.id] = movie
            count++
          }
        }
      }
      return Object.values(movies)
    },
    async getMoviesInfo () {
      this.movies = [];
      const movies = await this.getUniqueMovies()
      for (let i=0; i < movies.length; i++) {
        const movie = await this.$store.dispatch('getMovieInfo', movies[i])
        this.movies.push(movie)
      }
    }
  }
}
</script>
<style scoped>
@import "@/styles/HomePage.css";
</style>
