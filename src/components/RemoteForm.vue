<template>
  <v-content fluid class="py-0 px-4">
    <v-layout row>
      <v-flex>
        <v-subheader class="px-0">
          Add Remote:
        </v-subheader>
        <v-form>
          <v-text-field label="Alias"
                        prepend-icon="cloud"
                        suffix=" "
                        v-model="remote.alias"
          >
          </v-text-field>
          <v-text-field prepend-icon="language"
                        prefix="http://"
                        suffix=" "
                        v-model="remote.url"
          >
          </v-text-field>
          <v-text-field label="Interval"
                        prepend-icon="timer"
                        suffix="sec"
                        v-model="remote.interval"
                        @keypress.enter="save"
          ></v-text-field>
          <v-layout colunm>
              <v-spacer></v-spacer>
              <v-btn flat @click="cancel">
                CANCEL
              </v-btn>
              <v-btn color="success" class="mr-0" @click="save">
                SAVE
              </v-btn>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  export default {
    data() {
      return {
        remote: {
          _id: null,
          alias: '',
          url: '',
          interval: 0
        }
      }
    },

    methods: {

      reset() {
        this.remote = {
          _id: null,
          alias: '',
          url: '',
          interval: 0
        }
      },

      save() {

        let mutation = 'UPDATE_REMOTE'

        if(!this.remote._id) {
          mutation = 'ADD_REMOTE'
          this.remote._id = Date.now()
        }
        this.$store.commit(mutation, this.remote)
        this.reset()
        this.$router.push('/')

      },

      cancel() {
        this.reset()
        this.$router.push('/')
      }
    },

    beforeRouteEnter(to, from, next) {

      let remoteId = to.params.id

      if(remoteId) {
        next(vm => {
          let index = vm.$store.getters['remotes'].findIndex(({_id}) => _id === Number(remoteId))

          if(index > -1) {
            vm.remote = vm.$store.getters['remotes'][index]
          }
        })
      } else {
        next()
      }
    }
  }
</script>

<style></style>
