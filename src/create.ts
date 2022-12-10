export type Person = {
  name: string;
  group?: string;
} & Record<string, string>;

const people: Person[] = [
  { name: "Adrian", group: "k&a", password: "ah" },
  { name: "Kelly", group: "k&a", password: "kellogs" },
  { name: "Laura", group: "L&L", password: "lowri" },
  { name: "Clinton", group: "C", password: "patty" },
  { name: "Luke", group: "L&L", password: "luc" },
  { name: "Keith", group: "L&K", password: "quiche" },
  { name: "Lee", group: "L&K", password: "mumma" },
];

function shuffle<T = any>(array: T[]) {
  let i = array.length;
  let j;

  while (i !== 0) {
    j = Math.floor(Math.random() * i);
    i -= 1;

    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }

  return array;
}

function validateMatches(a: Person[], b: Person[]) {
  if (a.length !== b.length) return false;

  // pA - person a, pB - person b
  return a.every((pA, i) => {
    const pB = b[i];
    // skip matches that are the same name
    if (pA.name === pB.name) return false;
    // skip matches that are in the same group, if groups are defined
    if ((pA.group || pB.group) && pA.group === pB.group) return false;
    // Must be fine then
    return true;
  });
}

function calculate(people: Person[]): Person[] {
  if (people.length < 2) {
    return people.slice(0);
  }
  let timeout = 1000;

  let buffer1: Person[] = [];
  let buffer2: Person[] = [];

  const shuffleAndSlide = () => {
    const shuffled = shuffle([...people]);
    buffer1 = shuffled.slice(0);
    buffer2 = shuffled.slice(0);

    // slide each element over by one on buffer2
    buffer2.push(buffer2.shift()!);
  };

  const startTime = Date.now();
  const testDerangement: typeof validateMatches = (...args) => {
    // prevent infinite loops when no combination is found
    if (Date.now() - startTime > timeout) {
      const error = new Error("No combinations found");
      error.name = "GiftExchangeError";
      throw error;
    }
    return validateMatches(...args);
  };

  shuffleAndSlide();
  while (!testDerangement(buffer1, buffer2)) {
    shuffleAndSlide();
  }

  // map back to the order of the given person argument
  return people.map((p) => {
    const personIndex = buffer1.findIndex((match) => match.name === p.name);
    return buffer2[personIndex];
  });
}

const createMatches = () => {
  const matches = calculate(people).map<{ name: string; match: string }>(
    (p, i) => ({
      name: people[i].name,
      match: p.name,
      password: people[i].password,
    })
  );

  return matches;
};

const matches = createMatches();

import fs from "fs";

fs.writeFileSync(
  "./src/people.ts",
  `export const people = ${JSON.stringify(matches)}`
);
