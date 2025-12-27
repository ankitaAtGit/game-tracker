import { useNavigate, useParams } from "@solidjs/router";
import playersActions, { player, players } from "../../stores/players.store";
import { createEffect } from "solid-js";
import { addNewPlayer, updatePlayerById } from "../../storage/player";
import { notify } from "../../stores/toast.store";

const AddPlayer = () => {
  const navigate = useNavigate();
  const params = useParams();

  createEffect(() => {
    if (params.id) {
      const existingPlayer = players().find((p) => p.id === params.id);
      if (existingPlayer) {
        playersActions.setPlayer(existingPlayer);
      }
    }
  });

  const onSubmit = () => {
    if (!player().name) return;
    if (params.id) {
      updatePlayerById({ id: player().id, name: player().name });
      playersActions.updatePlayer({ id: player().id, name: player().name });
    } else {
      const newPlayer = addNewPlayer({ name: player().name });
      playersActions.addPlayer(newPlayer);
    }
    playersActions.resetPlayer();
    notify({
      title: params.id ? "Player Updated" : "Player Added",
      message: `Player ${player().name} has been ${
        params.id ? "updated" : "added"
      } successfully.`,
      type: "success",
    });
    navigate("/players");
  };

  const handleChange = (e) => {
    playersActions.setPlayer({ name: e.target.value });
  };
  return (
    <div class="form-group">
      <label for="playerName">Player Name</label>
      <input
        type="text"
        id="playerName"
        placeholder="Enter player name"
        onChange={handleChange}
        value={player().name}
      />
      <div class="player-actions" style="margin-top: 10px;">
        <button
          class="btn btn-secondary full-width"
          onClick={() => navigate("/players")}
        >
          Cancel
        </button>
        <button class="btn btn-primary full-width" onClick={onSubmit}>
          {params.id ? "Update Player" : "Add Player"}
        </button>
      </div>
    </div>
  );
};

export default AddPlayer;
