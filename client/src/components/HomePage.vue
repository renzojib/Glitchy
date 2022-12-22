<template>
  <div class="home-page">
    <h1 class="">Let Glitchy Choose</h1>
    <div class="forms">
      <select v-model="id" class="">
        <option v-for="genre in genres" :value="genre.id" :key="genre.id">{{genre.name}}</option>
      </select>
      <button @click="getMovieInfo">Random Movie</button>
    </div>
    <div class="movies">
      <img v-for="movie in $store.getters.movies" :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" :key="movie.id"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',

  data: () => ({
    genres: "",
    id: "",
    intervalId: "",
  }),
  watch: {
    id: function () {
      this.getTwoMoviesInfo()
    }
  },
  created () {
    this.getGenres()
  },
  methods: {
    async getGenres () {
      const genreRequestEndpoint = '/genre/movie/list';
      const requestParams = '?api_key=' + process.env.VUE_APP_TMDB_API_KEY
      const urlToFetch = process.env.VUE_APP_TMDB_BASEURL + genreRequestEndpoint + requestParams;
      try {
        const response = await axios.get(urlToFetch)
        if (response.status === 200) {
          this.genres = response.data.genres
          return
        }
        throw new Error('getting genres failed')
      } catch (error) {
        console.log(error)
      }
    },
    getRandom (movies) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];
      return randomMovie;
    },
    async getRandomMovie () {
      if (this.id === "") {
        return
      }
      const selectedGenre = this.id;
      const discoverMovieEndpoint = '/discover/movie';
      const requestParams = `?api_key=${process.env.VUE_APP_TMDB_API_KEY}&with_genres=${selectedGenre}`
      const urlToFetch = process.env.VUE_APP_TMDB_BASEURL+discoverMovieEndpoint+requestParams;
      try {
        const response = await axios.get(urlToFetch);
        if(response.status === 200) {
          const movies = response.data.results
          const movie = this.getRandom(movies)
          return movie
        }
        throw new Error('getting random movie failed')
      } catch (error) {
        console.log(error)
      }
    },
    async getMovieInfo () {
      if (this.id === "") {
        return
      }
      // clearInterval(this.intervalId)
      const movie = await this.getRandomMovie()
      const movieId = movie.id;
      const movieEndpoint = `/movie/${movieId}`;
      const requestParams = '?api_key=' + process.env.VUE_APP_TMDB_API_KEY;
      const urlToFetch = process.env.VUE_APP_TMDB_BASEURL + movieEndpoint + requestParams;
      try {
        const response = await axios(urlToFetch);
        if (response.status === 200) {
          this.$store.commit('setMovie', response.data)
          // this.$store.commit('setMovie', "") 
          this.$router.push({name: 'movie'})
          
          return
        }
        throw new Error('getting movie info failed')
      } catch (error) {
        console.log(error)
      }
    },
    async getTwoRandomMovies () {
      let movies = {}
      let count = 0
      while (count < 2) {
        if (count === 0) {
          let movie = await this.getRandomMovie()
          movies[movie.id] = movie
          count++
        } else {
          let movie = await this.getRandomMovie()
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
    async getTwoMoviesInfo () {
      this.$store.commit('clearMovies', [])
      if (this.id === "") {
        return
      }
      const movies = await this.getTwoRandomMovies()
      for (let i=0; i < movies.length; i++) {
        const movieId = movies[i].id;
        const movieEndpoint = `/movie/${movieId}`;
        const requestParams = '?api_key=' + process.env.VUE_APP_TMDB_API_KEY;
        const urlToFetch = process.env.VUE_APP_TMDB_BASEURL + movieEndpoint + requestParams;
        try {
          const response = await axios(urlToFetch);
          if (response.status === 200) {
            this.$store.commit('setMovies', response.data)
          } else {
            throw new Error('getting movie info failed')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>
<style scoped>
@import "@/styles/HomePage.css";
</style>
