import { Player } from "./types/Game";

export function createPlayer(name: string, computer: boolean): Player {
    return { name,lastChoice: "", wins: 0 };
  }
  