<template>
  <v-container fluid class="pa-0">
    <v-layout align-center>
      <v-flex>
        <jet-remote-list></jet-remote-list>
      </v-flex>
    </v-layout>
    <v-footer app>
      <v-btn fab color="green darken-2" class="mr-3" top right absolute @click="$router.push('/remote')">
        <v-icon>add</v-icon>
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script>
  import JetRemoteList from './RemoteList.vue'

  export default {
    components: { JetRemoteList }
  }
</script>

<style></style>
