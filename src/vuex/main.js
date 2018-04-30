
const state = {
  remotes: [],
  monitoring: []
}

const mutations = {
  SET_REMOTES(state, payload) {
    state.remotes = payload
  },

  UNSET_REMOTES(state) {
    state.remotes = []
  },

  SET_MONITORING(state, payload) {
    state.monitoring = payload
  },

  UNSET_MONITORING(state) {
    state.monitoring = []
  },

  ADD_REMOTE(state, payload) {
    state.remotes.push(payload)
    localStorage.setItem('remotes', JSON.stringify(state.remotes))
  },

  UPDATE_REMOTE(state, payload) {
    let oldIndex = state.remotes.findIndex(({_id}) => _id === payload._id)
    console.log(oldIndex, payload)
    if(oldIndex > -1) {
      state.remotes.splice(oldIndex, 1)
      state.remotes.push(payload)
      localStorage.setItem('remotes', JSON.stringify(state.remotes))
    }
  },

  REMOVE_REMOTE(state, remoteId) {
    let index = state.remotes.findIndex(({_id}) => _id === remoteId)
    if(index > -1) {
      state.remotes.splice(index, 1)
    }
    localStorage.setItem('remotes', JSON.stringify(state.remotes))
  },

  ACTIVATE_REMOTE(state, remoteId) {
    if(state.monitoring.indexOf(remoteId) < 0) {
      state.monitoring.push(remoteId)
    }
    localStorage.setItem('actives', JSON.stringify(state.monitoring))
  },
  DEACTIVATE_REMOTE(state, remoteId) {
    let index = state.monitoring.indexOf(remoteId)
    if(index > -1) {
      state.monitoring.splice(index, 1)
    }
    localStorage.setItem('actives', JSON.stringify(state.monitoring))
  }
}

const getters = {
  remotes: state => state.remotes,
  actives: state => state.monitoring
}

export default {
  state,
  mutations,
  getters
}
