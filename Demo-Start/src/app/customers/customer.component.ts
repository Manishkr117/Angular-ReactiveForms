import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';


import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor() { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      firstName:new FormControl(),
      lastName:new FormControl(),
      email: new FormControl(),
      sendCatalog:new FormControl(true)
      
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }



  // PopulateTestData(){
  //   console.log("Populate test data was called");
  //   this.customerForm.setValue({
  //     firstName:"MK",
  //     lastName: "K",
  //     email:"manishkr117@gmail.com",
  //     sendCatalog: false
  //   })
  // }

  PopulateTestData(){
    console.log("Populate test data was called");
    this.customerForm.patchValue({
      firstName:"MK",
      lastName: "K",
      // email:"manishkr117@gmail.com",
      sendCatalog: false
    })
  }
}
