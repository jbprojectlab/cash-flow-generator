import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'monthly-cash-flows',
  templateUrl: './monthly-cash-flows.component.html',
  styleUrls: ['./monthly-cash-flows.component.css']
})

export class MonthlyCashFlowsComponent {
  @Input() currentLoan: Loan;
  monthlyCashFlows: Array<MonthlyCashFlow> = [];
  monthlyCashFlowData: MonthlyCashFlow;
  totalMonthlyPayment: number;
  interest: number;
  principal: number;
  remainingBalance: number;
  loanTerm: number;

  ngOnInit() {
    this.calcCashFlow()
    console.log(this.monthlyCashFlows)
  }

  calcCashFlow() {
    let currentMonth = 1
    this.remainingBalance = this.currentLoan.balance;
    this.loanTerm = this.currentLoan.term;
    while (this.loanTerm > 0 || this.remainingBalance) {
      this.totalMonthlyPayment = (this.remainingBalance * (this.currentLoan.rate / 1200)) / +((1 - (1 + this.currentLoan.rate / 1200) ** (-1 * this.loanTerm)));
      this.interest = +(this.remainingBalance * +(this.currentLoan.rate / 1200)).toFixed(2);
      this.principal = +(this.totalMonthlyPayment - this.interest).toFixed(2);
      this.remainingBalance = +(this.remainingBalance - this.principal).toFixed(2);
      this.monthlyCashFlowData = {
          month: currentMonth,
          interest: this.interest,
          principal: this.principal,
          balance: this.remainingBalance
      }
      this.monthlyCashFlows.push(this.monthlyCashFlowData);
      this.loanTerm -= 1
      currentMonth += 1;
    }    
  }
}

interface Loan {
  name: string,
  balance: number,
  term: number,
  rate: number
}

interface MonthlyCashFlow {
  month: number,
  interest: number,
  principal: number,
  balance: number
}

