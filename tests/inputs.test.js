// My little jest, simple but it works !

import { readFile } from "./../src";

test("inputs1.txt", () => {
  expect(
    readFile("./../data/inputs1.txt")
  ).toBe("1 13:00-13:59");
});

test("inputs2.txt", () => {
  expect(
    readFile("./../data/inputs2.txt")
  ).toBe("2 08:00-08:59");
});

test("inputs3.txt", () => {
  expect(
    readFile("./../data/inputs3.txt")
  ).toBe("2 08:00-08:59");
});

test("inputs4.txt", () => {
  expect(
    readFile("./../data/inputs4.txt")
  ).toBe("2 12:29-13:28");
});

test("inputs5.txt", () => {
  expect(
    readFile("./../data/inputs5.txt")
  ).toBe("3 13:18-14:17");
});