import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { appConstants } from '../../app.constants';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isSubmitted:boolean = false;
  form: FormGroup;
  emailRegx = appConstants.emailRegx;
  passwordRegx = appConstants.passwordRegx;
  status = '';
  today:Date;
  constructor
  (
    private formBuilder:FormBuilder,
    private AS:AuthService,
    private router:Router
  ) { 
    this.AS.currentLoggedInUser = null;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(appConstants.spaceValidator)]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null,[ Validators.required,Validators.pattern(this.passwordRegx)]],
      confirmPassword: [null, [Validators.required,Validators.pattern(this.passwordRegx)]],
      gender:[null,[Validators.required]],
      role:[null,[Validators.required]],
      dob:[null,[Validators.required]],
      hobbiesRunning:false,
      hobbiesReading:false,
      hobbiesPainting:false,
      hobbiesOthers:false
    });
    this.today = new Date();
    this.AS.currentLoggedInUser = undefined;
    localStorage.clear();
  }
  submit() {
    this.isSubmitted = true;
    this.markAllAsTouched(this.form);
    if (!this.form.valid) {
      this.status='Please Fill the form correctly';
      return;
    }
    else if(this.form.value.password !== this.form.value.confirmPassword)
    {
      this.status = "Passwords doesn't match";
    }
    else{
      this.form.value.name.trim();
      this.form.value.email = this.form.value.email.toLowerCase();
      this.AS.signUp(this.form.value);
      setTimeout(()=>{
        this.status = this.AS.signUpStatus;
        if(this.status==='Registration Successful')
        {
          this.AS.currentLoggedInUser = this.form.value;
          localStorage.setItem('key',JSON.stringify(this.form.value));
          setTimeout(()=>{this.router.navigate(['/app/dashboard'])},800);
        }
        else
        {
          this.status = 'User already Exists, Click Here to Login or Choose another e-mail';
        }
    },400);
    }
  }
  gotoLogin()
  {
    if(this.status === 'User already Exists, Click Here to Login or Choose another e-mail')
    {
      this.router.navigate(['/app/signin']);
      return;
    }
    return;
  }
  ignoreSpace(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }
  markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        // If the control is a FormGroup, recurse into it
        this.markAllAsTouched(control);
      } else {
        // Otherwise, mark the control as touched
        control.markAsTouched();
      }
    });
  }
}
