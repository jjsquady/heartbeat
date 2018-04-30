<template>
  <v-app dark>
    <v-toolbar fixed app>
      <v-icon color="red darken-2">favorite</v-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop=""
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-fade-transition mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  export default {
    data() {
      return {
        cordova: Vue.cordova,
        clipped: false,
        drawer: true,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire',
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'HEARTBEAT',
      };
    },
    created () {
      var self = this;
      this.cordova.on('deviceready', () => {
        self.onDeviceReady();
      });

      let remotes = localStorage.getItem('remotes')
      if(remotes) {
        this.$store.commit('SET_REMOTES', JSON.parse(remotes))
      }

      let actives = localStorage.getItem('actives')
      if(actives) {
        this.$store.commit('SET_MONITORING', JSON.parse(actives))
      }
    },
    methods: {
      onDeviceReady: function () {
        // Handle the device ready event.
        this.cordova.on('pause', this.onPause, false);
        this.cordova.on('resume', this.onResume, false);
        if (this.cordova.device.platform === 'Android') {
          document.addEventListener('backbutton', this.onBackKeyDown, false);
        };
      },
      onPause () {
        // Handle the pause lifecycle event.
        console.log('pause');
      },
      onResume () {
        // Handle the resume lifecycle event.
        // SetTimeout required for iOS.
        setTimeout(function () {
          console.log('resume');
        }, 0);
      },
      onBackKeyDown () {
        // Handle the back-button event on Android. By default it will exit the app.
        navigator.app.exitApp();
      }
    },
  };
</script>

<style>
	body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
	}
  .footer{ /* Apply this to v-bottom-nav if necessary. */
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
</style>
