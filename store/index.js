export const state = () => ({
  // General data
  players: [
    {
      nom: "Thomas",
      abbr: "Th",
      pic_url: "thomas.jpg",
      merveille: "",
      points: [],
      score: 0,
    },
    {
      nom: "Louis",
      abbr: "Lo",
      pic_url: "louis.jpg",
      merveille: "",
      points: [],
      score: 0,
    },
    {
      nom: "Mélanie",
      abbr: "Ml",
      pic_url: "melanie.jpg",
      merveille: "",
      points: [],
      score: 0,
    },
    {
      nom: "Benjamin",
      abbr: "Be",
      pic_url: "benjamin.jpg",
      merveille: "",
      points: [],
      score: 0,
    },
    {
      nom: "Jean",
      abbr: "Je",
      pic_url: "jean.jpg",
      merveille: "",
      points: [],
      score: 0,
    },
    {
      nom: "Martin",
      abbr: "Mt",
      pic_url: "martin.jpg",
      merveille: "",
      points: [],
      score: 0,
    },
    {
      nom: "Clotilde",
      abbr: "Cl",
      pic_url: "clotilde.jpg",
      merveille: "",
      points: [],
      score: 0,
    },
    {
      nom: "Marie",
      abbr: "Mr",
      pic_url: "marie.jpg",
      merveille: "",
      points: [],
      score: 0,
    },
  ],
  merveilles: [
    "Babylone",
    "Olympia",
    "Gizah",
    "Rhódos",
    "Halikarnassós",
    "Ephesos",
    "Alexandria",
  ],
  merveilles_armada: [
    "Babylone",
    "Olympia",
    "Gizah",
    "Rhódos",
    "Halikarnassós",
    "Ephesos",
    "Alexandria",
    "Syracuse ",
  ],
  // Game data
  game: {
    players: [],
    armadaSwitch: false,
    indexPlayer: 0,
    indexPoints: 0,
  },
});

export const mutations = {
  updateArmadaSwitch(state, value) {
    state.game.armadaSwitch = value;
  },
  updateGame(state, game) {
    state.game = game;
  },
  updateIndexPlayer(state, index) {
    state.game.indexPlayer = index;
  },
  updateIndexPoints(state, index) {
    state.game.indexPoints = index;
  },
  updateGamePlayers(state, players) {
    let merveilles;
    if (state.game.armadaSwitch) {
      merveilles = shuffle([...state.merveilles_armada]);
    } else {
      merveilles = shuffle([...state.merveilles]);
    }

    let shuffledPlayers = shuffle(players);

    for (let i = 0; i < shuffledPlayers.length; i++) {
      shuffledPlayers[i].merveille = merveilles[i];
    }

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    console.log(shuffledPlayers);

    state.game.players = shuffledPlayers;

    localStorage.game = JSON.stringify(state.game);
  },
  resetPlayers(state, value) {
    state.game.players = [];
  },
  addPoints(state, point) {
    state.game.players[point.indexPlayer].points.push(point);
    state.game.players[point.indexPlayer].score = 0;
    for (const point of state.game.players[point.indexPlayer].points) {
      state.game.players[point.indexPlayer].score += Number(point.value);
    }
    localStorage.game = JSON.stringify(state.game);
  },
  modifyPoints(state, data) {
    state.game.players[data.indexPlayer].points[data.indexPoints].value =
      data.newVal;
    state.game.players[data.indexPlayer].score = 0;
    for (const point of state.game.players[data.indexPlayer].points) {
      state.game.players[data.indexPlayer].score += Number(point.value);
    }
    localStorage.game = JSON.stringify(state.game);
  },
};
