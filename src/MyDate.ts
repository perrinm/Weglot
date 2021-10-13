// Creating my own class to handle easily the date format

export class MyDate {
  date: Date;

  constructor(hours: number, minutes: number) {
    this.date = new Date();

    this.date.setHours(hours);
    this.date.setMinutes(minutes);
  }

  getTime(): string {
    const hours = (this.date.getHours() < 10 ? "0" : "") + this.date.getHours();
    const minutes = (this.date.getMinutes() < 10 ? "0" : "") + this.date.getMinutes();

    return hours + ":" + minutes;
  }

  getTimestamp(): number {
    return this.date.getTime();
  }

  getHours(): number {
    return this.date.getHours();
  }

  getMinutes(): number {
    return this.date.getMinutes();
  }
};