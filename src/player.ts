import { Player } from "./types/Game";

export function createPlayer(name: string, computer: boolean): Player {
    return { name, computer,lastChoice: "", wins: 0 };
  }
  