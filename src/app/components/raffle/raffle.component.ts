import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RaffleService} from "../../services/raffle.service";

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
})

export class RaffleComponent implements OnInit {

  // winner: boolean = false;
  drawings: Drawing[] = [];
  runningSimulation: boolean = false;
  currentNumbers: Drawing;
  totalAmountWon: number = 0;
  readonly GRAND_PRIZE = 1000000;
  readonly SECOND_PLACE_PRIZE = 500;
  readonly THIRD_PLACE_PRIZE = 100;

  constructor(
    private fb: FormBuilder,
    private raffleService: RaffleService
  ) { }

  simulationForm = this.fb.group({
    numberTickets: ['', Validators.required],
  });

  ngOnInit() {

  }

  onSubmit() {
    this.runningSimulation = true;
    this.clearData();

    setTimeout(() => {
      this.drawNumbers();
    }, 10);
  }

  clearData() {
    this.drawings = [];
    this.totalAmountWon = 0;
  }

  drawNumbers() {
    this.currentNumbers = {
      myNumbers: this.raffleService.getRandomIntList(250001, this.simulationForm.value.numberTickets),
      winningNumber: this.raffleService.winningNumber,
      secondPlaceNumbers: this.raffleService.secondPrizeNumbers,
      thirdPlaceNumbers: this.raffleService.thirdPrizeNumbers,
    };

    this.currentNumbers.secondPlaceWinningNumbers = this.secondPlaceWinningNumbers(this.currentNumbers);
    this.currentNumbers.thirdPlaceWinningNumbers = this.thirdPlaceWinningNumbers(this.currentNumbers);
    // console.log("current numbers", this.currentNumbers);

    this.totalAmountWon += this.currentNumbers.secondPlaceWinningNumbers.length * this.SECOND_PLACE_PRIZE;
    this.totalAmountWon += this.currentNumbers.thirdPlaceWinningNumbers.length * this.THIRD_PLACE_PRIZE;

    this.drawings.push(this.currentNumbers);

    if(!this.hasWon()) {
      setTimeout(() => {
        this.drawNumbers();
      }, 10)
    } else {
      this.totalAmountWon += this.GRAND_PRIZE;
      this.runningSimulation = false;
    }
  }

  hasWon() {
    if (this.currentNumbers) {
      return this.currentNumbers.myNumbers.includes(this.currentNumbers.winningNumber)
    } else {
      return false;
    }
  }

  secondPlaceWinningNumbers(currentNumbers: Drawing) {
    return [] = currentNumbers.secondPlaceNumbers.filter(number => {
      return currentNumbers.myNumbers.includes(number);
    }).sort(function(a, b){return a-b});
  }

  thirdPlaceWinningNumbers(currentNumbers: Drawing) {
    return [] = currentNumbers.thirdPlaceNumbers.filter(number => {
      return currentNumbers.myNumbers.includes(number);
    }).sort(function(a, b){return a-b});
  }
}

export interface Drawing {
  myNumbers: number[];
  winningNumber: number;
  secondPlaceNumbers: number[];
  thirdPlaceNumbers: number[];
  secondPlaceWinningNumbers?: number[];
  thirdPlaceWinningNumbers?: number[];
}
