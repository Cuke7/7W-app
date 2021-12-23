<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="5">
        <h2 class="text-center">
          {{ titre }}
        </h2>
        <!-- INPUT -->
        <v-row justify="space-between" align="center" class="my-4">
          <v-col cols="auto">
            <v-text-field
              v-model="points"
              label="Points"
              outlined
              type="number"
              autocomplete="off"
              hide-details
              ref="textField"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn fab color="secondary" @click="ajoutPoints">
              <v-icon> mdi-check </v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <!-- SCORES -->
        <div v-for="(player, index) in game.players" v-bind:key="index">
          <v-row align="center" justify="space-between">
            <v-col cols="auto">
              <v-row align="center" justify="space-between">
                <v-col>
                  <v-avatar color="orange">
                    <img :src="'/pictures/' + player.pic_url" />
                  </v-avatar>
                </v-col>
                <v-col cols="auto" class="text-body-1">
                  {{ player.nom }} <b>({{ player.score }})</b>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="auto">
              <v-chip label color="secondary">
                {{ player.merveille }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-between">
            <v-col
              cols="auto"
              v-for="(point, index) in player.points"
              v-bind:key="player + index"
              class="mx-auto px-0"
            >
              <v-chip
                label
                small
                :color="point.color"
                @click="openDialog(player, point)"
              >
                <div
                  v-if="
                    point.color == 'teal' ||
                    point.color == 'amber' ||
                    point.color == 'blue' ||
                    point.color == 'red' ||
                    point.color == 'indigo lighten-1' ||
                    point.color == 'green' ||
                    point.color == 'purple'
                  "
                  class="white--text"
                >
                  {{ point.value }}
                </div>
                <div v-else>
                  {{ point.value }}
                </div>
              </v-chip>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
        </div>
        <!-- DIALOG -->
        <v-dialog v-model="dialog" persistent max-width="500">
          <v-card>
            <v-card-title class="headline">
              {{ actualPlayer.nom }}
            </v-card-title>
            <v-card-text>
              Modifier les points "{{ actualPoint.categorie }}" ?
              <v-text-field
                v-model="pointModif"
                autocomplete="off"
                type="number"
                hide-details
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="pa-5">
              <v-btn color="red" @click="dialog = false" class="white--text">
                Anuller
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="green"
                @click="
                  dialog = false;
                  modifyPoints();
                "
                class="white--text"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import GameSettings from "~/components/GameSettings.vue";

export default {
  layout: "final",

  mounted() {
    this.$nextTick(function () {
      if (localStorage.game) {
        console.log("Got localStorage");
        let game = JSON.parse(localStorage.game);
        this.$store.commit("updateGame", game);
      }
    });
  },

  data: () => ({
    points: "",
    dialog: false,
    actualPlayer: { nom: null },
    actualPoint: { categorie: null },
    pointModif: "",
    colors: [
      "grey",
      "amber",
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "indigo lighten-1",
      "blue lighten-1",
    ],
    categories: [
      "merveilles",
      "or",
      "guerre",
      "cartes bleues",
      "cartes jaunes",
      "science",
      "guildes",
      "guerre maritime",
      "îles",
    ],
  }),
  computed: {
    game() {
      return this.$store.state.game;
    },
    titre() {
      let titre;
      if (this.game.indexPoints < (this.game.armadaSwitch ? 9 : 7)) {
        if (this.game.players.length > 0) {
          titre =
            this.game.players[this.game.indexPlayer].nom +
            " : " +
            this.categories[this.game.indexPoints];
        }
      } else {
        titre = "Tout est bon !";
      }
      return titre;
    },
  },
  methods: {
    ajoutPoints() {
      if (
        this.game.indexPoints < (this.game.armadaSwitch ? 9 : 7) &&
        this.points
      ) {
        let point = {
          value: this.points,
          color: this.colors[this.game.indexPoints],
          categorie: this.categories[this.indexPoints],
          indexPoints: this.game.indexPoints,
          indexPlayer: this.game.indexPlayer,
        };

        this.$store.commit("updateIndexPlayer", this.game.indexPlayer + 1);

        if (this.game.indexPlayer == this.game.players.length) {
          this.$store.commit("updateIndexPlayer", 0);
          this.$store.commit("updateIndexPoints", this.game.indexPoints + 1);
        }

        this.$refs.textField.focus();
        this.points = "";

        this.$store.commit("addPoints", point);
      }
    },
    openDialog: function (player, point) {
      this.pointModif = "";
      this.actualPlayer = player;
      this.actualPoint = point;
      this.dialog = true;
    },
    modifyPoints: function () {
      this.$store.commit("modifyPoints", {
        indexPlayer: this.actualPoint.indexPlayer,
        indexPoints: this.actualPoint.indexPoints,
        newVal: this.pointModif,
      });
      this.pointModif = "";
    },
  },
};
</script>
