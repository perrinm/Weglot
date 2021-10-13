import fs from "fs";
import {
  HOUR,
  MINUTE,
  FOLDERPATH,
} from "./constants";
import {
  MyDate,
} from "./MyDate";
import {
  calculateTime,
  formatLines,
  formatTime,
} from "./utils";

// Main function of the file
// Read the file

export const readFile = (fileName: string) => {
  const finalPath = FOLDERPATH + "/" + fileName;
  let lines: string;

  try {
    lines = fs.readFileSync(finalPath, "utf8");
  } catch (error) {
    throw new Error(`An error occured for the file ${fileName}`);
  }

  return formatFiles(lines);
};

// Most important function
// Parse the file to have a wanted format and create unions between ranges
// It will soon make coffee

const formatFiles = (lines: string) => {
  const linesArray: string[] = lines.split("\n");
  const formatedLines = formatLines(linesArray);

  let time1: string[];
  let time2: string[];
  let date1: MyDate;
  let date2: MyDate;
  let lowerDate1: MyDate;
  let lowerDate2: MyDate;
  let previousDay: string = "0";

  const finalLines: string[] = [];

  for (const line of formatedLines) {
    const token: any = line.split(" ");

    time1 = token[1].split(":");
    time2 = token[2].split(":");
    date1 = new MyDate(parseInt(time1[0], 10), parseInt(time1[1], 10));
    date2 = new MyDate(parseInt(time2[0], 10), parseInt(time2[1], 10));

    if (token[0] !== previousDay) {
      finalLines.push(token);

      lowerDate1 = date1;
      lowerDate2 = date2;
    } else if (lowerDate2) {
      if (date1.getTimestamp() > lowerDate2.getTimestamp()) {
        finalLines.push(token);
      } else if (date1.getTimestamp() >= lowerDate1.getTimestamp()
      && date1.getTimestamp() <= lowerDate2.getTimestamp()
      && date2.getTimestamp() > lowerDate2.getTimestamp()) {
        finalLines.pop();
        date1 = lowerDate1;
        const reformatedToken: any = [token[0], lowerDate1.getTime(), date2.getTime()];
        finalLines.push(reformatedToken);
        lowerDate1 = date1;
        lowerDate2 = date2;
      }
    }

    previousDay = token[0];
  }

  return findFreeHour(finalLines);
}

// Check first and last range
// example 08:00-XX:00 or XX:XX-17:59

const checkFirstOrLast = (
  data: string,
  first: boolean,
  firstOrLast: MyDate
): string => {
  let time: string[];
  let date1: MyDate;
  let result: string;

  if (first) {
    time = data[1].split(":");
    date1 = new MyDate(parseInt(time[0], 10), parseInt(time[1], 10));
    result = findRangeForMeeting(data[0], firstOrLast, date1);

    if (result) {
      return result;
    }
  } else {
    time = data[2].split(":");
    date1 = new MyDate(parseInt(time[0], 10), parseInt(time[1], 10));
    result = findRangeForMeeting(data[0], date1, firstOrLast);

    if (result) {
      return result;
    }
  }

  return "";
}

// Find every free slots and send it to findRangeForMeeting()

const findFreeHour = (data: string[]): string => {
  const firstDate = new MyDate(8, 0);
  const lastDate = new MyDate(17, 59);
  let currentDateIndex = 0;

  let time: string[];
  let result = "";
  let date1: MyDate;
  let date2: MyDate;

  for (let i = 0; i < data.length; ++i) {
    if (currentDateIndex !== parseInt(data[i][0], 10)) {
      result = checkFirstOrLast(data[i], true, firstDate);

      if (result !== "") {
        return result;
      }
      currentDateIndex = parseInt(data[i][0], 10);
    }

    if (data[i + 1] && data[i][0] === data[i + 1][0]) {
      time = data[i][2].split(":");
      date1 = new MyDate(parseInt(time[0], 10), parseInt(time[1], 10));

      time = data[i + 1][1].split(":");
      date2 = new MyDate(parseInt(time[0], 10), parseInt(time[1], 10));
      result = findRangeForMeeting(data[i][0], date1, date2)

      if (result) {
        return result;
      }
    }

    if (!data[i + 1] || currentDateIndex !== parseInt(data[i + 1][0], 10)) {
      result = checkFirstOrLast(data[i], false, lastDate);

      if (result) {
        return result;
      }
    }
  }

  return result;
};

// Find if there is a possible meeting for a given range

const findRangeForMeeting = (
  day: string,
  date1: MyDate,
  date2: MyDate
): string => {
  const isMeetingPossible = calculateTime(date2.getTimestamp() - date1.getTimestamp());

  if (!isMeetingPossible) {
    return "";
  }

  const hasMinute = date1.getHours() === 8 && date1.getMinutes() === 0 ? false : true;

  const startTime = formatTime(date1.getTimestamp() + (hasMinute ? MINUTE : 0));
  const endTime = formatTime(date1.getTimestamp() + HOUR - (hasMinute ? 0 : MINUTE));

  return `${day} ${startTime}-${endTime}`;
};