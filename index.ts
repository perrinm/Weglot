
// This is where our project starts

import fs from "fs";

import { readFile } from "./src/algo";
import { FOLDERPATH } from "./src";

// Our main function that makes coffee !

const main = (): void => {
  if (!fs.existsSync(FOLDERPATH)) {
    throw new Error("The data folder was not found")
  }

  fs.readdirSync(FOLDERPATH).map((fileName: string) => {
    readFile(fileName);
  });
}

main();
