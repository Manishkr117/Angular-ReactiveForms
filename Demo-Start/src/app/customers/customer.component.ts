import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';


import { Customer } from './customer';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

function emailMatcher(c:AbstractControl):{[key:string]:boolean}|null{
  const emailControl=c.get('email');
  const confirmEmailControl=c.get('confirmEmail');

  if(emailControl.pristine|| confirmEmailControl.pristine)
  return null;
  
  if(emailControl.value===confirmEmailControl.value){
    return null;
  }

  return {'match':true};
}

function ratingRange(min:number,max:number):ValidatorFn{
return ( c:AbstractControl):{ [key:string]:boolean} | null =>{
  if(c.value!==null && (isNaN(c.value)|| c.value<1 || c.value>5)){
return {'range': true};
  }

  //return Null of form Control is valid
  return null;
};
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    
    this.customerForm =  this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.minLength(3)]],
      emailGroup:this.fb.group({      
      email: ['',[Validators.required,Validators.email]],
      confirmEmail:['',Validators.required]
    }, {validator:emailMatcher}),
      phone:'',
      notification:'email',
      rating:[null,ratingRange(1,5)],
      sendCatalog:true
      
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value=>console.log(value)
    );
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

  setNotification(clickedOption : string){
    const phoneControl= this.customerForm.controls.phone;
    if(clickedOption==='text')
    phoneControl.setValidators(Validators.required);
    else
    phoneControl.clearValidators();

    phoneControl.updateValueAndValidity();
  }
}
