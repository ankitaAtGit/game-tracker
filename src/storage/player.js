export const fetchPlayers = () => {
  // Simulate fetching players through localStorage
  const players = JSON.parse(localStorage.getItem("players") || "[]");
  return players;
};

export const savePlayers = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

export const deletePlayerById = (id) => {
  const players = fetchPlayers();
  const updatedPlayers = players.filter((player) => player.id !== id);
  savePlayers(updatedPlayers);
};

export const updatePlayerById = (updatedPlayer) => {
  const players = fetchPlayers();
  const index = players.findIndex((p) => p.id === updatedPlayer.id);
  if (index !== -1) {
    players[index] = updatedPlayer;
    savePlayers(players);
  }
};

const generateNewId = () => {
  const players = fetchPlayers();
  const ids = players.map((p) => parseInt(p.id.replace("P0", "")));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const newId = maxId + 1;
  if (newId < 10) {
    return `P00${newId}`;
  }
  return `P0${maxId + 1}`;
};
export const addNewPlayer = (player) => {
  const newId = generateNewId();
  player.id = newId;
  const players = fetchPlayers();
  players.push(player);
  savePlayers(players);
  return player;
};
