<template>
  <v-card-text>
    <v-divider></v-divider>

    <!-- SWITCH ARMADA -->
    <h2 class="title my-4">Mode de jeu</h2>
    <v-switch
      hide-details
      v-model="armadaSwitch"
      :label="armadaSwitch ? 'Armada' : 'Classique'"
      class="mb-4"
      color="secondary"
    ></v-switch>

    <v-divider></v-divider>

    <!-- CHOIX DES JOUEURS-->
    <h2 class="title my-4">Choix des joueurs</h2>

    <v-chip-group
      v-model="selectedPlayers"
      column
      multiple
      max="8"
      class="mb-2"
    >
      <v-chip
        v-for="(player, index) in playersData"
        v-bind:key="index"
        filter
        color="primary"
      >
        <div>
          {{ player.nom }}
        </div>
      </v-chip>
      <v-btn
        color="secondary"
        icon
        @click="resetPlayers"
        class="mb-2"
        v-if="selectedPlayers.length > 0"
      >
        <v-icon> mdi-cancel </v-icon>
      </v-btn>
    </v-chip-group>

    <v-divider></v-divider>

    <!-- DISTRIBUTION-->
    <h2 class="title my-4">Distribution</h2>

    <v-row
      v-for="(player, index) in game.players"
      v-bind:key="index"
      align="center"
      justify="space-between"
    >
      <v-col cols="auto">
        <v-row align="center" justify="space-between">
          <v-col>
            <v-avatar color="orange">
              <img :src="'/pictures/' + player.pic_url" />
            </v-avatar>
          </v-col>
          <v-col>
            <v-col cols="auto">
              <div class="text-body-1 font-weight-bold">
                {{ player.nom }}
              </div>
            </v-col>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="auto">
        <v-chip label color="secondary">
          {{ player.merveille }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn nuxt color="primary" class="white--text" to="/gameFinal">
          Compter les points
        </v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  data: () => ({
    // selectedPlayers: [],
  }),
  mounted() {
    this.$nextTick(function () {
      if (localStorage.game) {
        console.log("Got localStorage");
        let game = JSON.parse(localStorage.game);
        this.$store.commit("updateGame", game);
      }
    });
  },
  computed: {
    game() {
      return this.$store.state.game;
    },
    armadaSwitch: {
      get() {
        return this.$store.state.game.armadaSwitch;
      },
      set(value) {
        this.$store.commit("updateArmadaSwitch", value);
      },
    },
    selectedPlayers: {
      get() {
        let arr = [];
        for (const player of this.$store.state.game.players) {
          arr.push(this.$store.state.game.players.indexOf(player));
        }
        return arr;
      },
      set(value) {
        let players = [];
        for (const val of value) {
          players.push(this.playersData[val]);
        }
        this.$store.commit("updateGamePlayers", players);
      },
    },
    playersData: {
      get() {
        return this.$store.state.players;
      },
    },
  },
  methods: {
    resetPlayers() {
      delete localStorage.game;
      this.$store.commit("resetPlayers");
    },
  },
};
</script>
