import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authenticationService: AuthenticationService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {

  }

  hide: boolean;

  get loginField() {
    return this.loginForm.controls;
  }

  doLogin() {
    if(this.loginForm.valid){
      this.signIn();
      this.authenticationService.login(this.username, this.password);
    }
    
  }
  username: string;
  password: string;

  signIn() {
    this.username = this.loginForm.get('username').value;
    this.password = this.loginForm.get('password').value;
  }

}
