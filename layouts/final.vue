<template>
  <v-app>
    <v-app-bar fixed app color="primary">
      <v-btn icon nuxt @click="$router.go(-1)">
        <v-icon color="white">
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer />
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
