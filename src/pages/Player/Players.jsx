import { useNavigate } from "@solidjs/router";

import { For, onMount } from "solid-js";
import playersActions, { players } from "../../stores/players.store";
import { deletePlayerById, fetchPlayers } from "../../storage/player";
import { gameId, rounds } from "../../stores/games.store";
import { notify } from "../../stores/toast.store";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";

const Players = () => {
  const navigate = useNavigate();

  onMount(() => {
    // Simulate fetching players from localStorage on mount
    const storedPlayers = fetchPlayers();
    playersActions.setPlayers(storedPlayers);
  });
  const deletePlayer = (player) => {
    deletePlayerById(player.id);
    playersActions.deletePlayer(player);
    notify({
      title: "Player Deleted",
      message: `Player ${player.name} has been deleted successfully.`,
      type: "info",
    });
  };
  const editPlayer = (player) => {
    navigate("/edit-player/" + player.id);
  };

  const addPlayer = () => {
    navigate("/add-player");
  };
  return (
    <div class="section">
      <h2>👥 Player Management</h2>

      <button
        disabled={rounds().length > 0 || gameId() !== null}
        class="btn btn-primary full-width"
        onClick={addPlayer}
      >
        Add Player
      </button>

      <div class="player-list">
        <For each={players()}>
          {(player) => (
            <div class="player-item">
              <div class="player-info">
                <div class="player-id">ID: {player.id}</div>
                <div class="player-name">{player.name}</div>
              </div>
              <div class="player-actions">
                <button
                  class="btn btn-primary small"
                  onClick={() => editPlayer(player)}
                >
                  <Edit height={15} width={15} class="white-icon" />
                </button>
                <button
                  class="btn btn-danger small"
                  onClick={() => deletePlayer(player)}
                >
                  <Delete height={15} width={15} class="white-icon" />
                </button>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Players;
