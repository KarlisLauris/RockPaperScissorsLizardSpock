interface NameDictionary {
  firstNames: string[];
  lastNames: string[];
}

const names: NameDictionary = {
  firstNames: [
    "Zoowee",
    "Flufffy ",
    "Buritt",
    "Bee",
    "Boop",
    "Eggpants",
    "Bugbee",
    "Figmoo",
    "Chewwee",
  ],
  lastNames: [
    "Beaniebag",
    "Woofham",
    "Noodleshine",
    "Wigglewhistle",
    "Boombag",
    "Swampworth",
    "Egghead",
    "Milksop",
    "Mumpsimus",
  ],
};

export function generateName(): string {
  const firstName =
    names.firstNames[Math.floor(Math.random() * names.firstNames.length)];
  const lastName =
    names.lastNames[Math.floor(Math.random() * names.lastNames.length)];
  return `${firstName} ${lastName}`;
}
