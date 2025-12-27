import { createStore } from "solid-js/store";
const initialState = {
  gameId: null,
  rounds: [], // {id, scores: [{playerId, score, name}]}
  scoreBoard: [],
};

const [state, setState] = createStore(structuredClone(initialState));

const gameActions = {
  setGame(game) {
    setState({ ...game });
  },
  addRound(round) {
    setState("rounds", (prev) => [...prev, round]);
  },

  deleteRound(round) {
    setState("rounds", (prev) => prev.filter((r) => r.id !== round.id));
  },

  updatePlayerScore(player, round) {
    setState(
      "rounds",
      (r) => r.id === round.id,
      "scores",
      (s) => s.playerId === player.playerId,
      player
    );
  },

  setScoreBoard(scoreBoard) {
    setState("scoreBoard", scoreBoard);
  },

  resetGame() {
    setState(structuredClone(initialState));
  },
};

const gameId = () => state.gameId;
const rounds = () => state.rounds;
const scoreBoard = () => state.scoreBoard;

export { gameId, rounds, scoreBoard };
export default gameActions;
