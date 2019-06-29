import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'loans',
  templateUrl: './loans.component.html',
  styleUrls: ['../app.component.css', './loans.component.css']
})

export class LoansComponent {
  public loans: Array<{ name: string, balance: number, term: number, rate: number }> = [];
  public pooledMonthlyCashFlows: Array<MonthlyCashFlow> = [];
  public loanForm: FormGroup;
  public name: string;
  public submitted: boolean = false;
  public loansTableDisplayed: boolean = true;
  public loanFormDisplayed: boolean = false
  public loanInfoDisplayed: boolean = true;
  public cashFlowsDisplayed: boolean = false;
  public cashFlowButtonDisplayed: boolean = true;
  public addNewLoanButtonDisplayed: boolean = true;

  constructor(private _fb: FormBuilder) { };

  ngOnInit() {
    this.loanForm = this._fb.group({
      name: new FormControl(),
      balance: new FormControl(),
      term: new FormControl(),
      rate: new FormControl()
    });
  };

  addNewLoan() {
    this.submitted = false;
    this.loanFormDisplayed = true;
    this.cashFlowsDisplayed = false;
    this.cashFlowButtonDisplayed = false;
    this.addNewLoanButtonDisplayed = false;
  };

  closeLoanForm() {
    this.loanFormDisplayed = false;
  };
  
  submitLoanInfo() {
    if(this.loanForm.valid) {
      this.loans.push(this.loanForm.value);
      this.loanForm.reset();
      this.loanFormDisplayed = false;
      this.loanInfoDisplayed = true;
      this.cashFlowButtonDisplayed = true;
    };

    this.submitted = true;
  };

  deleteLoan(i) {
    this.loans.splice(i, 1);
  };

  displayMonthlyCashFlows() {
    this.loansTableDisplayed = !this.loansTableDisplayed;
    this.cashFlowsDisplayed = !this.cashFlowsDisplayed;
    console.log(this.pooledMonthlyCashFlows);
  };
};