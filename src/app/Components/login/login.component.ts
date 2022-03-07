import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  
  constructor(
    private _authService : AuthService,
    private formBuilder : FormBuilder,
    private snackbar : MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getLoginForm()
  }

  getLoginForm(){
    this.loginForm = this.formBuilder.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  submitForm(){
    if(this.loginForm.valid){
      let data = this.loginForm.getRawValue();
      if(data.username.toLowerCase() === 'fingent' && data.password == 'fingent'){
        let randomJWTToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImZpbmdlbnQiLCJpYXQiOjE1MTYyMzkwMjJ9.PNe6ph_c1wgJ36tdUTGuRFdcjbR0yxKiFkYpSQ0Mo_E'
        let userData = {
          username : data.username,
          token : randomJWTToken
        }
        this._authService.setToken(userData);
        this.snackbar.open('Login successfull','',{
          panelClass:'success-snack',
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 3000
        });
        this.router.navigate(['/dashboard']);
      }else{
        this.snackbar.open('Invalid username or password','',{
          panelClass:'error-snack',
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 3000
        })
      }
    }
  }

}
