# Project Weglot

## Information about the environement

I chose nodejs and I took several dev dependencies :
- Typescript, for fun and helping me in my code.
- ts-node which is the famous nodemon but working with typescript.
- Jest which is probably my best friend to realize tests.

## How to use ?

"npm run dev" to launch with nodemon (dev environment)
"npm start" to launch production mode
"npm test" to run tests with jest.

## How was my approach ?

I have divided this exercice in different parts :
  1) creating the environment with ts-node to debug with a lot of consolelog.
  2) Creating a loop to read files.
  3) Formated file to get 3 tokens like "DAY XX:XX XX:XX" to ["DAY", "XX:XX", "XX:XX"]
  4) deleting and restructuring time slots :
    - time slots like 10:38-11:59 was useless to take into account if I had 10:00-12:00
    - Restructuring time slots like 10:38-11:59 with 11:13-14:57 to get only one 10:38-14:57
  5) Once this is done, i just send free time slots to a little function which tells me if we have 59 minutes in a row.

## My feelings about this test

In appearance, this test doesnt seem really complicated, but we all know that appearances aren't always what they are.

The biggest part was obviously the parsing part. The best you parsed the file and you restructure the time slots the easiest it is to do.

I have to say i may have lost some hair during the parsing part, but that's a secret :)
