import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post<User>(`${this.url}/register`, user);
  }
}
