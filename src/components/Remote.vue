<template>
  <v-list-tile>
    <v-list-tile-avatar>
      <v-avatar :class="remoteIconClass.color">
        <v-icon>{{ remoteIconClass.icon }}</v-icon>
      </v-avatar>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ remote.alias }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ remote.url }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-layout>
        <v-switch color="success" v-model="monitoring"></v-switch>
        <v-menu class="ml-5">
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list ripple>
            <v-list-tile @click="$emit('onEdit', remote)">
              <v-list-tile-title>Edit</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$emit('onRemove', remote._id)">
              <v-list-tile-title>Remove</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    props: {
      remote: {
        type: Object,
        default: () => {
          return {
            _id: 0,
            alias: '',
            url: '',
            interval: 0
          }
        }
      }
    },

    data() {
      return {
        monitoring: false,
        status: '',
        monitor: null
      }
    },

    watch: {
      monitoring() {
        this.checkMonitoring()
      }
    },

    computed: {
      ...mapGetters(['actives']),

      remoteIconClass() {
        if (!this.monitoring) {
          return {
            color: "grey lighten",
            icon: "remove"
          }
        }

        if (!this.status) {
          return {
            color: "orange darken-1",
            icon: "refresh"
          }
        }

        if (this.status && this.status === 'online') {
          return {
            color: "green darken-1 white--text",
            icon: "check_circle"
          }
        }

        return {
          color: "red darken-1 white--text",
          icon: "report_problem"
        }
      }
    },

    methods: {
      checkMonitoring() {
        if (this.monitoring) {

          this.$store.commit('ACTIVATE_REMOTE', this.remote._id)

          this.monitor = setInterval(() => {
            if (typeof fetch !== "undefined") {
              fetch(`http://${this.remote.url}`, {
                method: 'GET',
                mode: 'no-cors'
              })
              .then(() => {

                this.status = 'online'
              })
              .catch(() => {

                this.status = 'offline'
              })
            }
          }, this.remote.interval * 1000)

        } else {
          clearInterval(this.monitor)
          this.$store.commit('DEACTIVATE_REMOTE', this.remote._id)
          this.status = ''
          this.monitor = null
        }
      },
    },

    created() {
      if(this.actives) {
        this.monitoring = this.actives.indexOf(this.remote._id) > -1
      }
    }
  }
</script>

<style></style>
