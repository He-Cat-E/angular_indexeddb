import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  status = '';
  constructor
  (
    private formBuilder:FormBuilder,
    private AS:AuthService,
    private router:Router
  ) { 
    this.AS.currentLoggedInUser = undefined;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
    this.AS.currentLoggedInUser = undefined;
    localStorage.clear();
  }
  get f(){
    return this.loginForm.controls;
  }
    submit() {
    this.f.email.setValue(this.f.email.value.trim());
    //this.loginForm.value.email = this.loginForm.value.email.trim()
    if (!this.loginForm.valid) {
      return;
    }

    this.AS.signIn(this.loginForm.value.email,this.loginForm.value.password);
    setTimeout(()=>{
      this.status=this.AS.signInStatus;
      if(this.status==='login-successful')
      {
        setTimeout(()=>{this.router.navigate(['/app/dashboard'])},800);
      }
    },400);
  }
}
