<template>
  <v-app>
    <v-app-bar fixed app color="primary" class="rounded-b-xl">
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
      title: "Seven wonders ⚔️",
    };
  },
};
</script>

<style scoped>
.v-main:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.25;
  background-image: url("~/static/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  background-size: cover;
}
</style>
