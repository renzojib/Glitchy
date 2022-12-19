<template>
  <div class="">
    <h1 class="">Find Movie</h1>
    <div class="">
      <select v-model="id" class="">
        <option v-for="genre in genres" :value="genre.id" :key="genre.id">{{genre.name}}</option>
      </select>
    <button @click="getMovieInfo">Find</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',

  data: () => ({
    genres: "",
    id: ""
  }),
  mounted () {
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
      const movie = await this.getRandomMovie()
      console.log(movie)
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
    }
  }
}
</script>
<style scoped>
.hero {
  text-align: center;
}
.select {
  border: 2px solid #000;
}
</style>
