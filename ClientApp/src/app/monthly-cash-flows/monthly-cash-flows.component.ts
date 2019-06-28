import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'monthly-cash-flows',
  templateUrl: './monthly-cash-flows.component.html',
  styleUrls: ['../app.component.css']
})

export class MonthlyCashFlowsComponent {
  @Input() currentLoan: Loan;
  @Input() pooledMonthlyCashFlows: Array<MonthlyCashFlow> = [];
  monthlyCashFlows: Array<MonthlyCashFlow> = [];
  monthlyCashFlowData: MonthlyCashFlow;
  totalMonthlyPayment: number;
  interest: number;
  principal: number;
  remainingBalance: number;
  loanTerm: number;

  ngOnInit() {
    this.calcCashFlow();
    console.log(this.pooledMonthlyCashFlows)
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
      };
        this.monthlyCashFlows.push(this.monthlyCashFlowData);
        if (!this.pooledMonthlyCashFlows[currentMonth]) {
            this.pooledMonthlyCashFlows[currentMonth] = this.monthlyCashFlowData;
        } else {
          let pooledMonth = this.pooledMonthlyCashFlows[currentMonth];
          this.pooledMonthlyCashFlows[currentMonth] = {
            month: pooledMonth.month + this.monthlyCashFlowData.month,
            interest: pooledMonth.interest + this.monthlyCashFlowData.interest,
            principal: pooledMonth.principal + this.monthlyCashFlowData.principal,
            balance: pooledMonth.balance + this.monthlyCashFlowData.balance
          }
        }
      this.loanTerm -= 1;
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
