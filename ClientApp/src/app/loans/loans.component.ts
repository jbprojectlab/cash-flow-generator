﻿import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css' ]
})

export class LoansComponent {
  public loans: Array<{name: string, balance: number, term: number, rate: number}> = []
  public loanForm: FormGroup;
  public name: string;
  public loanFormDisplayed: boolean = false
  public loanInfoDisplayed: boolean = true;
  public cashFlowsDisplayed: boolean = false;
  public cashFlowButtonDisplayed: boolean = true;
  public addNewLoanButtonDisplayed: boolean = true;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.loanForm = this._fb.group({
      name: new FormControl(),
      balance: new FormControl(),
      term: new FormControl(),
      rate: new FormControl()
    })
  }

  addNewLoan() {
    this.loanFormDisplayed = true    
    this.cashFlowButtonDisplayed = false
    this.addNewLoanButtonDisplayed = false
  }
  
  submitLoanInfo() {
    this.loans.push(this.loanForm.value)
    this.loanForm.reset()
    this.loanFormDisplayed = false
    this.loanInfoDisplayed = true
    this.cashFlowButtonDisplayed = true
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  displayMonthlyCashFlows() {
    this.cashFlowsDisplayed = !this.cashFlowsDisplayed
  }
}
