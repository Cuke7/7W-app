<template>
  <v-app>
    <v-app-bar fixed app color="primary">
      <v-btn icon nuxt @click="$router.go(-1)">
        <v-icon color="white"> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer />
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon class="mx-4" color="white" @click="reset()">mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "7W app",
    };
  },
  methods: {
    reset() {
      this.$store.commit("resetScores");
    },
  },
};
</script>
