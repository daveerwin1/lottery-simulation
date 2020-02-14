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

  getRandomIntList(max, total) {

    this.numberList = [];

    for (let index = 0; index < total;) {
      let number = this.getRandomInt(max);

      if (!this.numberList.includes(number)) {
        this.numberList.push(number);
        index++;
      }
    }

    this.numberList.sort(function(a, b){return a-b});

    return this.numberList;
  }
}
