import { Component, ngOnInit, Input } from '@angular/core';

@Component({
  selector: 'monthly-cash-flows',
  templateUrl: './monthly-cash-flows.component.html',
  styleUrls: ['./monthly-cash-flows.component.css']
})

export class MonthlyCashFlowsComponent {
  @Input() loans: Array<{month: number, interest: number, principal: number, balance: number}>;
    ngOnInit() {
      console.log('loans:  ', this.loans)
    }
}