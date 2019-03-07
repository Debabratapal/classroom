import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private signup: SignupService, 
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    const user = {
      email:this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.signup.login(user)
    this.signup.getTokenChange()
    .subscribe(result => {
      if(result.status) {
        console.log("login successful");
        this.router.navigate(['./home'])
      }
    })
  }

}
