export enum Choice {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors",
  Lizard = "lizard",
  Spock = "spock",
}

export enum Winner {
  Player = "player",
  Computer = "computer",
  Tie = "tie",
}

export interface Player {
  name: string;
  computer: boolean;
  lastChoice: string;
  wins: number;
}
