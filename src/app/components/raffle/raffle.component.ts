import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
})
export class RaffleComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  simulationForm = this.fb.group({
    numberTickets: ['', Validators.required],
  });

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.simulationForm.value);
  }
}
