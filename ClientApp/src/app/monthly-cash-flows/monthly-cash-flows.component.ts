import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'monthly-cash-flows',
  templateUrl: './monthly-cash-flows.component.html',
  styleUrls: ['../app.component.css']
})

export class MonthlyCashFlowsComponent {
  @Input() public endOfLoans: boolean;
  @Input() currentLoan: Loan;
  @Input() pooledMonthlyCashFlows: Array<MonthlyCashFlow> = [];
  @Output() pooledMonths: Array<MonthlyCashFlow> = [];
  monthlyCashFlows: Array<MonthlyCashFlow> = [];
  monthlyCashFlowData: MonthlyCashFlow;
  totalMonthlyPayment: number;
  interest: number;
  principal: number;
  remainingBalance: number;
  loanTerm: number;

  ngOnInit() {
    this.calcCashFlow();
  };

    calcCashFlow() {    
    let currentMonth = 1;
    this.remainingBalance = this.currentLoan.balance;
    this.loanTerm = this.currentLoan.term;
    while (this.loanTerm > 0 || this.remainingBalance) {
      this.totalMonthlyPayment = (this.remainingBalance * (this.currentLoan.rate / 1200)) / +((1 - (1 + this.currentLoan.rate / 1200) ** (-1 * this.loanTerm)));
      this.interest = +(this.remainingBalance * +(this.currentLoan.rate / 1200)).toFixed(2);
      this.principal = +(this.totalMonthlyPayment - this.interest).toFixed(2);
      this.remainingBalance = +(this.remainingBalance - this.principal).toFixed(2);
      this.monthlyCashFlowData = {
        month: currentMonth,
        interest: this.interest.toFixed(2),
        principal: this.principal.toFixed(2),
        balance: this.remainingBalance.toFixed(2)
      };
      this.monthlyCashFlows.push(this.monthlyCashFlowData);
      if(!this.pooledMonthlyCashFlows[currentMonth - 1]) {
          this.pooledMonthlyCashFlows[currentMonth - 1] = this.monthlyCashFlowData;
      } else {
        let pooledMonth = this.pooledMonthlyCashFlows[currentMonth - 1];
        this.pooledMonthlyCashFlows[currentMonth - 1] = {
          month: this.monthlyCashFlowData.month,
          interest: (Number(pooledMonth.interest) + Number(this.monthlyCashFlowData.interest)).toFixed(2),
          principal: (Number(pooledMonth.principal) + Number(this.monthlyCashFlowData.principal)).toFixed(2),
          balance: (Number(pooledMonth.balance) + Number(this.monthlyCashFlowData.balance)).toFixed(2)
        };
      };
      this.loanTerm -= 1;
      currentMonth += 1;
    };    
  };
};

interface Loan {
  name: string,
  balance: number,
  term: number,
  rate: number
};
