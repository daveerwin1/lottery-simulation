import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.scss']
})
export class RaffleComponent implements OnInit {
  numberTickets = new FormControl();

  constructor(private fb: FormBuilder) { }

  simulationForm = this.fb.group({
    numberTickets: ['', Validators.required],
  });

  ngOnInit() {

  }

  onSubmit() {
    
  }
}
