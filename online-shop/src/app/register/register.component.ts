import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../entity/user';
import { UserService } from '../services/user.service';
import { CustomValidators } from '../validator/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  constructor(private userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]),
      confirmPassword: new FormControl('', [Validators.required]),
      checkbox: new FormControl('', [Validators.required])
    },
    CustomValidators.mustMatch('password', 'confirmPassword'),
    );
    this.user = new User();
   }
   minLength: number = 8;
   maxLength: number = 16;
   hide: boolean;
  ngOnInit(): void {
  }

  get registerField() {
    return this.registerForm.controls;
  }


  register() {

    if(this.registerForm.valid){
      this.submitRegister();
    }

    this.userService.register(this.user).subscribe(data => {
      data = this.user;
      this.router.navigate(['login']);
    });

  }

  submitRegister() {
    
    if(this.registerForm.valid){

      this.user.username = this.registerForm.get('username').value;
      this.user.email = this.registerForm.get('email').value;
      this.user.password = this.registerForm.get('password').value;
    }
  }


}
