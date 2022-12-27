import axios from 'axios'
export default {
    state: {
        genres: "",
        movieInfo: "",
        movies: [],
    },
    getters: {
        id: state => state.id,
        movie: state => state.movie,
        twoMovies: state => state.twoMovies,
        movies: state => state.movies,
        genres: state => state.genres,
    },
    mutations: {
        setId (id) {
          localStorage.setItem('id', id)
        },
        setMovies (state, movies) {
            state.movies = movies
        },
        setMovieInfo (state, movieInfo) {
            state.movieInfo = movieInfo
        },
        setGenres (state, genres) {
            state.genres = genres
        }
    },
    actions: {
        async getGenres ({ commit }) {
            const genreRequestEndpoint = '/genre/movie/list';
            const requestParams = '?api_key=' + process.env.VUE_APP_TMDB_API_KEY
            const urlToFetch = process.env.VUE_APP_TMDB_BASEURL + genreRequestEndpoint + requestParams;
            try {
              const response = await axios.get(urlToFetch)
              if (response.status === 200) {
                commit('setGenres', response.data.genres)
                return
              }
              throw new Error('getting genres failed')
            } catch (error) {
              console.log(error)
            }
        },
        async getMovies ({ commit }, id, page) {
            const discoverMovieEndpoint = '/discover/movie';
            const requestParams = `?api_key=${process.env.VUE_APP_TMDB_API_KEY}&page=${page}&with_genres=${id}`
            const urlToFetch = process.env.VUE_APP_TMDB_BASEURL+discoverMovieEndpoint+requestParams;
            try {
              const response = await axios.get(urlToFetch);
              if(response.status === 200) {
                commit('setMovies', response.data.results)
                return
              }
              throw new Error('getting random movie failed')
            } catch (error) {
              console.log(error)
            }
        },
        getRandom ({ state }) {
          const randomIndex = Math.floor(Math.random() * state.movies.length);
          const randomMovie = state.movies[randomIndex];
          return randomMovie;
        },
        async getMovieInfo ({ commit }, movie) {
            const movieId = movie.id;
            const movieEndpoint = `/movie/${movieId}`;
            const requestParams = '?api_key=' + process.env.VUE_APP_TMDB_API_KEY + '&append_to_response=videos,images';
            const urlToFetch = process.env.VUE_APP_TMDB_BASEURL + movieEndpoint + requestParams;
            try {
              const response = await axios(urlToFetch);
              if (response.status === 200) {
                commit('setMovieInfo', response.data)
                return response.data
              }
              throw new Error('getting movie info failed')
            } catch (error) {
              console.log(error)
            }
        },
    }
}