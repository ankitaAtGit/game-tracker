import { For } from "solid-js";
import { scoreBoard } from "../../stores/games.store.js";

const medals = {
  winner: "🥇",
  second: "🥈",
  third: "🥉",
};

const ScoreBoard = () => {
  return (
    <div class="section game-section">
      <h2>🏆 Current Scoreboard</h2>

      <div class="scoreboard">
        <Show
          when={scoreBoard().length > 0}
          fallback={
            <p class="empty-state">
              No scores available. Start playing to see the scoreboard!
            </p>
          }
        >
          <table class="scoreboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player ID</th>
                <th>Player Name</th>

                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              <For each={scoreBoard()}>
                {(player, index) => (
                  <tr class={player.isWinner ? "winner" : ""}>
                    <td>
                      {player.isWinner
                        ? medals.winner
                        : index() === 1
                        ? medals.second
                        : medals.third}
                      {index() + 1}
                      {player.isDraw
                        ? " (Draw)"
                        : player.isWinner
                        ? " (Winner)"
                        : ""}
                    </td>
                    <td>{player.playerId}</td>
                    <td>{player.name}</td>
                    <td>
                      <strong>{player.totalScore}</strong>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Show>
      </div>
    </div>
  );
};

export default ScoreBoard;
