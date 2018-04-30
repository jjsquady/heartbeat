<template>
  <v-list twoLine>
    <v-subheader>
      Remotes
    </v-subheader>
    <v-divider></v-divider>
    <template v-if="!!remotes.length">
      <jet-remote @onEdit="editRemote"
                  @onRemove="removeRemote"
                  v-for="item in remotes"
                  :remote="item"
                  :key="item._id"
      >
      </jet-remote>
    </template>
    <v-card v-else>
      <v-card-text>
        Remote list its empty. Register one.
      </v-card-text>
    </v-card>
  </v-list>
</template>

<script>
  import JetRemote from './Remote.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: { JetRemote },

    computed: {
      ...mapGetters({
        remotes: 'remotes',
        actives: 'monitoring'
      })
    },

    methods: {
      editRemote(remote) {
        this.$router.push(`/remote/${remote._id}`)
      },

      removeRemote(remoteId) {
        this.$store.commit('REMOVE_REMOTE', remoteId)
      },
    }
  }
</script>

<style></style>
