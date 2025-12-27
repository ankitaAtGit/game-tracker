import { createStore } from "solid-js/store";
const initialState = {
  players: [],
  player: {
    id: null,
    name: "",
  },
};

const [state, setState] = createStore(structuredClone(initialState));

const playersActions = {
  setPlayers(players) {
    setState("players", players);
  },
  addPlayer(player) {
    setState("players", (prev) => [...prev, player]);
  },
  setPlayer(player) {
    setState("player", (prev) => ({ ...prev, ...player }));
  },
  updatePlayer(player) {
    setState("players", (item) => item.id === player.id, player);
  },
  deletePlayer(player) {
    setState("players", (prev) => prev.filter((item) => item.id !== player.id));
  },
  resetPlayer() {
    setState("player", { ...initialState.player });
  },
};

const players = () => state.players;
const player = () => state.player;

export { player, players };
export default playersActions;
