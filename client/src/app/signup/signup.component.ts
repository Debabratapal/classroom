import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private signup: SignupService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'name': new FormControl(null),
      'email': new FormControl(null),
      'department': new FormControl(null),
      'password': new FormControl(null),
    })
  }

  onSignUp() {
    console.log(this.signUpForm);
    
    const user = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }

    this.signup.signup(user)
  }
}
