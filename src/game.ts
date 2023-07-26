import { Choice, Winner } from './types/Game';

const beats: Record<Choice, Choice[]> = {
  [Choice.Rock]: [Choice.Scissors, Choice.Lizard],
  [Choice.Scissors]: [Choice.Paper, Choice.Lizard],
  [Choice.Paper]: [Choice.Rock, Choice.Spock],
  [Choice.Lizard]: [Choice.Spock, Choice.Paper],
  [Choice.Spock]: [Choice.Rock, Choice.Scissors],
};

function getRandomChoice(): Choice {
    const choices = Object.values(Choice);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}


function getWinner(
  playerChoice: Choice,
  computerChoice: Choice,
): Winner {
  if (playerChoice === computerChoice) {
    return Winner.Tie;
  }

  if (beats[playerChoice].includes(computerChoice)) {
    return Winner.Player;
  }

  return Winner.Computer;
}

export function playGame(playerChoice: string | void): { winner: Winner; computerChoice: string } {
  const computerChoice = getRandomChoice();

  if (!playerChoice) {
    const winner = getWinner(computerChoice, getRandomChoice());
    return { winner, computerChoice };
  }

  const winner = getWinner(playerChoice as Choice, computerChoice);
  return { winner, computerChoice };
}

