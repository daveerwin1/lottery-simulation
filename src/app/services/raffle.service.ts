import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {

  numberList: number[];

  constructor() { }

  get winningNumber(): number {
    return this.getRandomInt(250001);
  }

  get secondPrizeNumbers(): number[] {
    return this.getRandomIntList(250001, 300);
  }

  get thirdPrizeNumbers(): number[] {
    return this.getRandomIntList(250001, 1500);
  }

  private getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private getRandomIntList(max, count) {

    this.numberList = [];

    for (let x = 0; x < count;) {
      let number = this.getRandomInt(max);

      if (!this.numberList.includes(number)) {
        this.numberList.push(number);
        count++;
      }
    }

    return this.numberList;
  }
}
