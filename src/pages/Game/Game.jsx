import { onMount } from "solid-js";
import {
  addRoundToGame,
  calculateScores,
  createNewGame,
  deleteRoundFromGame,
  fetchGame,
  resetGameStorage,
  updateScoresInRound,
} from "../../storage/game.js";
import gameActions, { gameId, rounds } from "../../stores/games.store";
import { notify } from "../../stores/toast.store.js";
import Delete from "../../assets/delete.svg";

const Game = () => {
  onMount(() => {
    //Initialize game state if needed
    const game = fetchGame();
    if (game) {
      gameActions.setGame(game);
    }
  });
  const handleNewGame = () => {
    try {
      // Logic to create a new game
      if (
        confirm("Starting a new game will reset the current game. Proceed?")
      ) {
        gameActions.resetGame();
        const newGame = createNewGame();
        gameActions.setGame(newGame);
        notify({
          title: "New Game Created",
          message: "A new game has been created successfully.",
          type: "success",
        });
      }
    } catch (error) {
      notify({
        title: "Error",
        message: "Failed to create a new game. Please try again.",
        type: "error",
      });
    }
  };

  const addRound = () => {
    // Logic to add a round
    const newRound = addRoundToGame();
    gameActions.addRound(newRound);
    notify({
      title: "New Round Added",
      message: `Round ${newRound.id} has been added successfully.`,
      type: "success",
    });
  };

  // Logic to update player score in a round
  const updatePlayerScore = (value, playerScore, round) => {
    gameActions.updatePlayerScore({ ...playerScore, score: value }, round);
  };

  const updateRound = (round) => {
    updateScoresInRound(round);
    notify({
      title: "Scores Updated",
      message: `Scores for Round ${round.id} have been updated.`,
      type: "success",
    });
  };

  const deleteRound = (round) => {
    // Logic to delete a round
    gameActions.deleteRound(round);
    deleteRoundFromGame(round.id);
    notify({
      title: "Round Deleted",
      message: `Round ${round.id} has been deleted successfully.`,
      type: "info",
    });
  };

  const calculateCurrentScores = () => {
    const finalScores = calculateScores();
    gameActions.setScoreBoard(finalScores);
  };

  const resetGame = () => {
    if (confirm("Are you sure you want to reset the game?")) {
      gameActions.resetGame();
      resetGameStorage();
      notify({
        title: "Game Reset",
        message: "The game has been reset successfully.",
        type: "info",
      });
    }
  };

  const gameStarted = () => !!gameId();

  return (
    <div class="section">
      <h2>🎯 Game Session</h2>

      <div class="game-controls">
        <button class="btn btn-primary" onClick={handleNewGame}>
          Create New Game
        </button>
        <button
          class="btn btn-success"
          disabled={!gameStarted()}
          onClick={addRound}
        >
          Add New Round
        </button>
        <button
          class="btn btn-warning"
          disabled={!gameStarted()}
          onClick={calculateCurrentScores}
        >
          Refresh Scores
        </button>
        <button
          disabled={!gameStarted()}
          class="btn btn-danger"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>

      <div class="rounds-container">
        <Show
          when={rounds().length >= 1}
          fallback={
            <div class="empty-state">
              No rounds added yet. Start by adding a new round.
            </div>
          }
        >
          <For each={rounds()}>
            {(round) => (
              <div class="round-card">
                <div class="round-header">
                  <div class="round-title">Round {round.id}</div>
                  <button
                    class="btn btn-danger small"
                    onClick={() => deleteRound(round)}
                  >
                    <Delete height={15} width={15} class="white-icon" />
                  </button>
                </div>
                <div class="score-inputs">
                  <For each={round.scores}>
                    {(playerScore) => (
                      <div class="score-input-group">
                        <label>{playerScore?.name}</label>
                        <input
                          type="number"
                          placeholder="Score"
                          value={playerScore?.score || 0}
                          onChange={(e) =>
                            updatePlayerScore(
                              e.target.value,
                              playerScore,
                              round
                            )
                          }
                        />
                      </div>
                    )}
                  </For>
                </div>
                <div class="round-actions">
                  <button
                    onClick={() => updateRound(round)}
                    class="btn btn-primary"
                  >
                    Save Round
                  </button>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default Game;
