export default {
    state: {
        // id: "",
        // genres: "",
        movie: "",
        likedMovies: []
    },
    getters: {
        // id: state => state.id,
        movie: state => state.movie,
        likedMovies: state => state.likedMovies
    },
    mutations: {
        setMovie (state, movie) {
            state.movie = movie
        },
        setLikedMovie (state, likedMovie) {
            state.likedMovies.push(likedMovie)
        }
    },
    actions: {
        setMovie ({ commit }, movie) {
            commit('setMovie', movie)
        },
        setLikedMovie ({commit}, likedMovie) {
            commit('setLikedMovie', likedMovie)
        }
    }
}