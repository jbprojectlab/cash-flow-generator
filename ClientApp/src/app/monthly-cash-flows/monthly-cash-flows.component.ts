import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'monthly-cash-flows',
  templateUrl: './monthly-cash-flows.component.html',
  styleUrls: ['./monthly-cash-flows.component.css']
})

export class MonthlyCashFlowsComponent {
  @Input() loans: Array<{ month: number, balance: number, term: number, rate: number }>;
  monthlyCashFlows: Array<MonthlyCashFlow> = [];
  totalMonthlyPayment: number;
  interest: number;
  principal: number;
  monthlyCashFlowData: MonthlyCashFlow;

    ngOnInit() {

        this.calcCashFlow()
                console.log(this.monthlyCashFlows)
  }

  calcCashFlow() {
      this.loans.forEach(({term, rate, balance}, idx) => {
          while (term > 0) {
              idx += 1
              this.totalMonthlyPayment = (balance * (rate / 1200)) / +((1 - (1 + rate / 1200) ** (-1 * term)));
              this.interest = +(balance * +(rate / 1200)).toFixed(2);
              this.principal = +(this.totalMonthlyPayment - this.interest).toFixed(2);
              balance = balance - this.principal;
              this.monthlyCashFlowData = {
                  month: idx,
                  interest: this.interest,
                  principal: this.principal,
                  balance: balance
              }
              this.monthlyCashFlows.push(this.monthlyCashFlowData);
              term -= 1
          }


      })
     
  }
}

interface MonthlyCashFlow {
    month: number,
    interest: number,
    principal: number,
    balance: number
}