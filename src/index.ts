import { playGame } from "./game";
import { createPlayer } from "./player";
import { generateName } from "./utils/nameGen";
import readline from "readline";

const RULES =
  "Rock crushes Scissors.Scissors cuts Paper.Paper covers Rock.Rock crushes Lizard.Lizard poisons Spock.Spock smashes Scissors.Scissors decapitates Lizard.Lizard eats Paper.Paper disproves Spock.Spock vaporizes Rock.".replace(
    /\./g,
    ".\n"
  );
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(questionText: string): Promise<string> {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

async function getUserChoice(): Promise<string> {
  const choice = await ask("Enter your choice: ");
  const parsedChoice = choice.toLowerCase().trim();
  if (
    parsedChoice !== "rock" &&
    parsedChoice !== "paper" &&
    parsedChoice !== "scissors" &&
    parsedChoice !== "lizard" &&
    parsedChoice !== "spock"
  ) {
    console.log("Please enter a valid choice.");
    return getUserChoice();
  }
  return parsedChoice;
}

async function getUserName(): Promise<string> {
  const name = await ask("What is your name? ");
  return name;
}

async function getDifficulty(): Promise<number> {
  const difficulty = await ask("Choose your level of difficulty (1-2): ");
  const parsedDifficulty = parseInt(difficulty);
  if (isNaN(parsedDifficulty) || parsedDifficulty < 1 || parsedDifficulty > 2) {
    console.log("Please enter a valid number.");
    return getDifficulty();
  }
  return parsedDifficulty;
}

async function main() {
  console.log("Welcome to Rock, Paper, Scissors, Lizard, Spock!");
  console.log("You will be playing against computer players.");
  console.log("Game rules are as follows:");
  console.log(RULES);
  const playerName: string = await getUserName();
  const difficulty: number = await getDifficulty();
  const user = createPlayer(playerName, false);

  switch (difficulty) {
    case 1:
      const numRound: number = 3;
      const computerPlayer = createPlayer(generateName(), true);
      console.log("Let's play!");
      console.log("You will be playing against " + computerPlayer.name + ".");
      console.log("You will be playing " + numRound + " rounds.");
      console.log("Good luck!");
      for (let i = 0; i < numRound; i++) {
        console.log(`\nRound ${i + 1}:\n`);

        const playerChoice = await getUserChoice();
        const { winner, computerChoice } = playGame(playerChoice);

        console.log(`${playerName}: ${playerChoice}`);
        console.log(`${computerPlayer.name}: ${computerChoice}`);

        if (winner === "tie") {
          console.log("It's a tie! The round will be replayed.");
          i--;
        } else if (winner === "player") {
          console.log("You win!");
        } else {
          console.log("You lose!");
        }
      }
      console.log("End of rounds.");
      break;
    case 2:
      user.wins = 0;
      const computerPlayers = [
        createPlayer(generateName(), true),
        createPlayer(generateName(), true),
        createPlayer(generateName(), true),
      ];
      const numRounds = 3;

      for (const computerPlayer of computerPlayers) {
        console.log(
          `You will be playing ${numRounds} rounds against ${computerPlayer.name}.`
        );
        console.log("Good luck!");

        for (let i = 0; i < numRounds; i++) {
          console.log(`\nRound ${i + 1}:\n`);

          const playerChoice = await getUserChoice();
          const { winner, computerChoice } = playGame(playerChoice);

          console.log(`${playerName}: ${playerChoice}`);
          console.log(
            `${computerPlayer.name}: ${
              computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
            }`
          );

          if (winner === "tie") {
            console.log("It's a tie! The round will be replayed.");
            i--;
          } else if (winner === "player") {
            console.log("You win!");
            user.wins++;
          } else {
            console.log("You lose!");
            computerPlayer.wins++;
          }
        }

        console.log(
          `End of ${computerPlayer.name} rounds. Your total wins: ${user.wins}\n`
        );
      }
      const overallWinner = computerPlayers.every(
        (computerPlayer) => user.wins > computerPlayer.wins
      )
        ? "You are the overall winner!"
        : "You did not defeat all players. Try again!";
      console.log(overallWinner);
      break;
  }
  rl.close();
}
main();
