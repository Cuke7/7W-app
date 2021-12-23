<template>
  <v-app>
    <v-app-bar fixed app color="primary">
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer></v-spacer>
      <v-btn icon nuxt to="/stats">
        <v-icon class="mx-4" color="white">mdi-chart-bar</v-icon>
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
      title: "7W app"
    };
  }
};
</script>
