<template>
  <v-card class="mx-auto">
    <v-row align="center" justify="space-between">
      <v-col cols="auto">
        <v-card-title>
          Hall of fame
        </v-card-title>

        <v-card-subtitle>
          {{ gameData.length }} parties analysées
        </v-card-subtitle>
      </v-col>
      <v-col cols="auto" class="mx-4">
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn></v-col
      >
    </v-row>

    <v-expand-transition eager>
      <div v-show="show">
        <v-divider></v-divider>

        <v-switch
          hide-details
          v-model="armadaSwitch"
          :label="armadaSwitch ? 'Armada' : 'Classique'"
          class="mb-4 mx-4"
        ></v-switch>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  Joueur
                </th>
                <th class="text-center">
                  Points moyens par partie
                </th>
                <th class="text-center">
                  Victoires
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(player, index) in data" :key="index">
                <td class="text-center">
                  <v-avatar color="orange" size="50" class="my-2">
                    <img :src="'/pictures/' + player.player.pic_url" />
                  </v-avatar>
                </td>

                <td class="text-center" v-if="index == 0">
                  {{ Math.round(player.meanScore) }} 🥇
                </td>

                <td class="text-center" v-else-if="index == 1">
                  {{ Math.round(player.meanScore) }} 🥈
                </td>

                <td class="text-center" v-else-if="index == 2">
                  {{ Math.round(player.meanScore) }} 🥉
                </td>

                <td v-else class="text-center">
                  {{ Math.round(player.meanScore) }}
                </td>
                <td class="text-center">{{ player.nombreVictoire }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import data from "~/static/data/data.json";

export default {
  data: () => ({
    show: false,
    gameData: data,
    armadaSwitch: false
  }),
  //
  computed: {
    players: {
      get() {
        return this.$store.state.players;
      }
    },
    data: {
      get() {
        let data = [];

        let games = this.gameData.filter(
          game => game.armada == this.armadaSwitch
        );

        // Get the winner for each game
        for (const game of games) {
          let best = { player: "", score: 0 };
          for (const score of game.scores) {
            let total = score.details.reduce(function(acc, curr) {
              acc += curr;
              return acc;
            }, 0);
            if (total > best.score) {
              best = { player: score.nom, score: total };
            }
          }
          game.best = best.player;
        }

        //console.log(games);

        for (const player of this.players) {
          let scores = [];
          let nombreVictoire = 0;
          for (const game of games) {
            for (const score of game.scores) {
              if (score.nom == player.nom) {
                scores.push(score.details);
              }
            }
            if (game.best == player.nom) {
              nombreVictoire++;
            }
          }
          data.push({
            player: player,
            // Create array with the score of each games
            scores: scores.map(function(item) {
              return item.reduce(function(acc, curr) {
                acc += curr;
                return acc;
              }, 0);
            }),
            nombreVictoire: nombreVictoire
          });

          for (const dataSet of data) {
            let sum = 0;
            for (const score of dataSet.scores) {
              sum += score;
            }
            dataSet.meanScore = sum / dataSet.scores.length;
          }
        }
        console.log(data);
        return data.sort(function(a, b) {
          return isNaN(b.meanScore) ? -1 : b.meanScore - a.meanScore;
        });
      }
    }
  }
};
</script>
