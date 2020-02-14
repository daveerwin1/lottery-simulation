import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RaffleService} from "../../services/raffle.service";

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
})

export class RaffleComponent implements OnInit {

  winningNumbers: number[];
  winner: boolean = false;
  drawings: Drawing[] = [];
  runningSimulation: boolean = false;

  currentNumbers: Drawing;

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

    for (let x = 0; x < 300; x++) {

      this.currentNumbers = {
        myNumbers: this.raffleService.getRandomIntList(250001, this.simulationForm.value.numberTickets),
        winningNumber: this.raffleService.winningNumber,
        secondPlaceNumbers: this.raffleService.secondPrizeNumbers,
        thirdPlaceNumbers: this.raffleService.thirdPrizeNumbers,
      };

      this.drawings.push(this.currentNumbers);

      if (this.currentNumbers.myNumbers.includes(this.currentNumbers.winningNumber)) {
        this.winner = true;
      }
    }

    //this.runningSimulation = false;
  }
}

export interface Drawing {
  myNumbers: number[];
  winningNumber: number;
  secondPlaceNumbers: number[];
  thirdPlaceNumbers: number[];
}
