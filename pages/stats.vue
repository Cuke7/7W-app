<template>
  <v-container fluid>
    <h1 class="text-center">
      Statistiques
    </h1>

    <LeaderBoard class="my-5"></LeaderBoard>

    <v-row justify="center" align="center">
      <v-col cols="12" lg="8">
        <v-row>
          <v-col cols="12">
            <v-chip-group v-model="selectedPlayer" column mandatory>
              <v-chip
                v-for="(player, index) in players"
                v-bind:key="index"
                filter
                outlined
                :value="player"
              >
                {{ player.nom }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <v-radio-group v-model="extensionRadio" hide-details>
              <v-radio value="0" label="Stats classiques"></v-radio>
              <v-radio value="1" label="Stats Armada"></v-radio>
              <v-radio value="2" label="Stats globales"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" class="white--text" @click="displayStats">
              Afficher
            </v-btn>
          </v-col>
        </v-row>

        <div v-if="chartData">
          <div class="text-body-1 mt-5 text-center" v-if="totalGames">
            Stats sur {{ totalGames }} partie(s).
          </div>

          <v-row justify="center">
            <v-col cols="12">
              <bar-chart
                :chart-data="datacollection"
                :options="options"
              ></bar-chart>
            </v-col>
          </v-row>
        </div>
        <div v-if="noData" class="text-body-1 mt-5 text-center">
          Pas de parties trouvées.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import data from "~/static/data/data.json";
import BarChart from "~/components/BarChart.js";
import LineChart from "~/components/LineChart.js";
import LeaderBoard from "~/components/LeaderBoard";

export default {
  components: { BarChart, LineChart, LeaderBoard },
  layout: "final",
  data: () => ({
    noData: false,
    extensionRadio: "2",
    totalGames: 0,
    gameData: data,
    armadaSwitch: false,
    selectedPlayer: null,
    chartData: null,
    options: {
      legend: { display: false },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            if (ctx.datasetIndex == 0) return value + "%";
            else return "";
          },
          anchor: "end",
          align: "end"
        }
      }
    }
  }),
  computed: {
    pageHeight() {
      return document.body.scrollHeight;
    },

    players: {
      get() {
        return this.$store.state.players;
      }
    },
    datacollection: function() {
      return {
        labels: [
          "merveilles",
          "or",
          "guerre",
          "cartes bleues",
          "cartes jaunes",
          "science",
          "guildes",
          "guerre maritime",
          "îles"
        ],
        datasets: [
          {
            axis: "y",
            label: "Points moyens",
            data: this.chartData,
            fill: false,
            backgroundColor: [
              "#9E9E9E",
              "#FFC107",
              "#F44336",
              "#2196F3",
              "#FFEB3B",
              "#4CAF50",
              "#9C27B0",
              "#5C6BC0",
              "#42A5F5"
            ]
          }
        ]
      };
    }
  },

  methods: {
    displayStats: function() {
      if (this.selectedPlayer) {
        let games;

        if (this.extensionRadio == "2") {
          games = this.gameData;
        } else {
          // On filtre "0" => classique "1" => Armada
          games = this.gameData.filter(
            game => game.armada == this.extensionRadio
          );
        }

        let scores = [];

        // On vérifie que le joueur sélectionné à participé aux games
        for (const game of games) {
          for (const score of game.scores) {
            if (score.nom == this.selectedPlayer.nom) {
              scores.push(score.details);
            }
          }
        }

        if (scores.length > 0) {
          this.noData = false;
          let m = scores.length;
          console.log(m);

          // Sum vertically array of array of different length
          let data = scores.reduce(function(r, a) {
            a.forEach(function(b, i) {
              r[i] = (r[i] || 0) + b;
            });
            return r;
          }, []);

          console.log(data);

          let chartData = [];
          for (let index = 0; index < data.length; index++) {
            chartData.push(data[index] / m);
          }

          this.chartData = chartData;
          this.totalGames = m;
          this.$vuetify.goTo(this.pageHeight);
        } else {
          this.chartData = null;
          this.noData = true;
        }
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.selectedPlayer = this.players[0];
    });
  }
};
</script>
