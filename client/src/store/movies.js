export default {
    state: {
        // id: "",
        // genres: "",
        movie: "",
        movies: []
    },
    getters: {
        // id: state => state.id,
        movie: state => state.movie,
        movies: state => state.movies
    },
    mutations: {
        setMovie (state, movie) {
            state.movie = movie
        },
        setMovies (state, movie) {
            state.movies.push(movie)
        },
        clearMovies (state, movie) {
            state.movies = movie
        }
    },
    actions: {
        setMovie ({ commit }, movie) {
            commit('setMovie', movie)
        },
        setMovies ({commit}, movie) {
            commit('setMovies', movie)
        }
    }
}