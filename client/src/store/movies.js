import axios from 'axios'
export default {
    state: {
        id: "",
        sort: "popularity.desc",
        page: 1,
        genres: "",
        language: "",
        languages: [],
        movieInfo: "",
        movies: [],
    },
    getters: {
        id: state => state.id,
        movie: state => state.movie,
        twoMovies: state => state.twoMovies,
        movies: state => state.movies,
        genres: state => state.genres,
        languages: state => state.languages,
    },
    mutations: {
        setId (state, id) {
          state.id = id
          localStorage.setItem('id', id.toString())
        },
        setSort (state, sort) {
          state.sort = sort
          localStorage.setItem('sort', sort)
        },
        setPage (state, page) {
          state.page = page
          localStorage.setItem('page', page.toString())
        },
        setMovies (state, movies) {
            state.movies = movies
        },
        setMovieInfo (state, movieInfo) {
            state.movieInfo = movieInfo
        },
        setGenres (state, genres) {
            state.genres = genres
        },
        setLanguages (state, languages) {
          state.languages = languages
        },
        setLanguage (state, language) {
          state.language = language
          localStorage.setItem('language', language)
        },
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
        async getMovies ({ state, commit }) {
            const newId = state.id || localStorage.getItem('id')
            const newSort = state.sort || localStorage.getItem('sort')
            const newPage = state.page || localStorage.getItem('page')
            const discoverMovieEndpoint = '/discover/movie';
            const requestParams = `?api_key=${process.env.VUE_APP_TMDB_API_KEY}&page=${newPage}&with_genres=${newId}&sort_by=${newSort}`
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
        async getMovieInfo ({ state, commit }, movie) {
            const movieId = movie.id;
            const language = state.language || localStorage.getItem('language') || "en"
            const movieEndpoint = `/movie/${movieId}`;
            const requestParams = '?api_key=' + process.env.VUE_APP_TMDB_API_KEY + '&append_to_response=videos,images' + '&language=' + language;
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
        async getLanguages ({ commit }) {
          const languageEndpoint = "/configuration/languages"
          const requestParams = '?api_key=' + process.env.VUE_APP_TMDB_API_KEY
          const urlToFetch = process.env.VUE_APP_TMDB_BASEURL + languageEndpoint + requestParams;
          try {
            const response = await axios.get(urlToFetch)
            if (response.status === 200) {
              const data = response.data.filter((lang) => { return lang.name !== "" && lang.name !== "No Language"}).sort((a, b) => {
                if (a.iso_639_1 < b.iso_639_1) {
                  return -1;
                }
                if (a.iso_639_1 > b.iso_639_1) {
                  return 1;
                }
                // a must be equal to b
                return 0;
              })
              commit('setLanguages', data)
              return
            }
            throw new Error("getting languages failed")
          } catch (err) {
            console.log((err))
          }
        }
    }
}