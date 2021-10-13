// Some functions that can be useful

// Format time to display XX:XX

export const formatTime = (timestamp: number): string => {
  const newDate = new Date(timestamp);
  const hours = (newDate.getHours() < 10 ? "0" : "") + newDate.getHours();
  const minutes = (newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes();

  return hours + ":" + minutes;
};

// Calculate if there are 59 free min in a range

export const calculateTime = (timestamp: number): boolean => {
  return timestamp / 1000 / 60 >= 59 ? true : false;
};

// Format lines and sort by days

export const formatLines = (data: string[]): string[] => {
  const formatedLines = [];

  for (const line of data) {
    const newLine = line.replace("-", " ");

    formatedLines.push(newLine);
  }

  formatedLines.sort();

  return formatedLines;
}