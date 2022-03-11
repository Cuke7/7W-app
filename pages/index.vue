<template>
  <v-container>
    <h1 class="text-center">Réglages de la partie</h1>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <GameSettings></GameSettings>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameSettings from "~/components/GameSettings.vue";

export default {
  components: {
    GameSettings,
  },
};
</script>
