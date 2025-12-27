//simulate game fetch APIs with localStorage

export const fetchGame = () => {
  const game = JSON.parse(localStorage.getItem("game") || "{}");
  return game;
};

export const saveGame = (game) => {
  localStorage.setItem("game", JSON.stringify(game));
};

export const updateGame = (updatedGame) => {
  saveGame(updatedGame);
};

const generateGameId = () => {
  return `G${Date.now()}`;
};

export const deleteRoundFromGame = (roundId) => {
  const game = fetchGame();
  if (game.rounds) {
    game.rounds = game.rounds.filter((r) => r.id !== roundId);
    saveGame(game);
  }
};

const generateNewRound = () => {
  const players = JSON.parse(localStorage.getItem("players") || "[]");
  const currentGame = fetchGame();
  const lastRoundId =
    (currentGame?.rounds || []).length > 0
      ? currentGame.rounds[currentGame.rounds.length - 1].id
      : 0;
  return {
    id: lastRoundId + 1,
    scores: players.map((p) => ({
      playerId: p.id,
      score: 0,
      name: p.name,
    })),
  };
};
export const createNewGame = () => {
  const round = generateNewRound();
  const game = {
    gameId: generateGameId(),
    rounds: [round],
  };
  saveGame(game);
  return game;
};

export const addRoundToGame = () => {
  const round = generateNewRound();
  const game = fetchGame();
  if (!game.rounds) {
    game.rounds = [];
  }
  game.rounds.push(round);
  saveGame(game);
  return round;
};

export const updateScoresInRound = (newRound) => {
  const game = fetchGame();
  const round = game.rounds.find((r) => r.id === newRound.id);

  if (round) {
    round.scores = newRound.scores;
    saveGame(game);
  }
};

export const calculateScores = () => {
  //give sorted array of players with total scores in descending order and a winner flag, if draw then multiple winners
  const game = fetchGame();
  const scoreMap = {};
  game.rounds.forEach((round) => {
    round.scores.forEach((scoreEntry) => {
      if (!scoreMap[scoreEntry.playerId]) {
        scoreMap[scoreEntry.playerId] = {
          playerId: scoreEntry.playerId,
          name: scoreEntry.name,
          totalScore: 0,
        };
      }
      scoreMap[scoreEntry.playerId].totalScore += Number(scoreEntry.score);
    });
  });
  const scoresArray = Object.values(scoreMap);
  scoresArray.sort((a, b) => b.totalScore - a.totalScore);
  const highestScore = scoresArray.length > 0 ? scoresArray[0].totalScore : 0;
  const winners = [];
  scoresArray.forEach((entry, index) => {
    entry.isWinner = entry.totalScore === highestScore;
    if (entry.isWinner) {
      winners.push(index);
      if (winners.length > 1) {
        //more than 1 winner, mark all as draw
        winners.forEach((winIndex) => {
          scoresArray[winIndex].isDraw = true;
        });
      }
    }
  });
  return scoresArray;
};

export const resetGameStorage = () => {
  localStorage.removeItem("game");
};
