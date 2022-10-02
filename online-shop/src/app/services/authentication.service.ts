import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  SESSION_USERNAME: string = 'authenticatedUser';
  url: string = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  username: string;
  password: string;

  public login(username: string, password: string): any {
      const headers = new HttpHeaders({Authorization: this.createBasicAuthToken(username,password)});
      this.http.get<User>(`${this.url}/login`, {headers}).subscribe(data => {
        this.username = username;
        this.password = password;
        this.registerLogin(username,password);
        this.router.navigate(['home']);
      });
  }

  token: any;
  createBasicAuthToken(username: string, password: string){
    this.token = 'Basic ' + window.btoa(username + ":" + password);
    localStorage.setItem('token', this.token);
    return this.token;
  }
  
  registerLogin(username, password) {
    localStorage.setItem(this.SESSION_USERNAME, username);
  }

  logout() {
    localStorage.removeItem(this.SESSION_USERNAME);
    localStorage.removeItem('token');
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let loggedInUser = localStorage.getItem(this.SESSION_USERNAME);
    if (loggedInUser === null) return false
    return true
  }

  showLoggedInUser(){
    let user = localStorage.getItem(this.SESSION_USERNAME);
    if(user === null) return '';
    return user;
  }
}
