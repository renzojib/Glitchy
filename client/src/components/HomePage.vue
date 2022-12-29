<template>
  <div class="home-page">
    <div class="forms">
      <div>
        <label for="genre">Pick a genre:</label>
        <select id="genre" v-model="id" ref="sel">
          <option v-for="genre in $store.getters.genres" :value="genre.id" :key="genre.id">{{genre.name}}</option>
        </select>
      </div>
      <div v-if="id">
        <label for="sort">Sort by:</label>
        <select v-model="sort" id="sort">
          <option value="popularity.asc">popularity ascending</option>
          <option value="popularity.desc">popularity descending</option>
          <option value="release_date.asc">release date ascending</option>
          <option value="release_date.desc">release date descending</option>
          <option value="vote_average.asc">vote average ascending</option>
          <option value="vote_average.desc">vote average descending</option>
          <option value="original_title.asc">title ascending</option>
          <option value="original_title.desc">title descending</option>
        </select>
      </div>
      <div v-if="id">
        <label for="page">Page to choose from:</label>
        <input v-model="page" type="number" min="0" max="500" id="page"/>
      </div>
      <button @click="goToMovie">Glitchy's Choice</button>
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
    sort: "",
    page: "",
    movies: [],
  }),
  watch: {
    id: async function (newValue) {
      await this.$store.commit('setId', newValue)
      this.sort = "popularity.desc"
      this.page = 1
      await this.$store.dispatch('getMovies', newValue)
      this.getMoviesInfo()
    },
    sort: async function (newValue) {
      await this.$store.commit('setSort', newValue)
    },
    page: async function (newValue) {
      await this.$store.commit('setPage', newValue)
    },
  },
  mounted: async function () {
    await this.$store.dispatch('getGenres')
    this.id = this.getRandomGenreId()
  },
  methods: {
    goToMovie () {
      if (!this.$refs.sel.value) {return}
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
    },
    getRandomGenreId () {
      return this.$store.getters.genres[Math.floor(Math.random() * this.$store.getters.genres.length)].id
    }
  }
}
</script>
<style scoped>
@import "@/styles/HomePage.css";
</style>
