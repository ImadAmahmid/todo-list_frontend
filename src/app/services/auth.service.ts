import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


export const USER_STORAGE_KEY = 'JWT_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {

    return this.httpClient.post('http://localhost:8088/api/v1/auth/authenticate', {
      email,
      password
    }).pipe(
      map((res: any) => {
        // We could store the user information as well in this step
        console.log('Result', this.getDecodedAccessToken(res.access_token));
        localStorage.setItem(USER_STORAGE_KEY, res.access_token)
        return res;
      })
    );
  }

  
  createAccount(email: string, password: string) {

    return this.httpClient.post('http://localhost:8088/api/v1/auth/register', {
      email,
      password
    }).pipe(
      map((res: any) => {
        // We could store the user information as well in this step
        console.log('Result', this.getDecodedAccessToken(res.access_token));
        localStorage.setItem(USER_STORAGE_KEY, res.access_token)
        return res;
      })
    );
  }

  
  logOut() {
    localStorage.removeItem(USER_STORAGE_KEY)
    // todo: call backend to actually remove the token from database
  }


  isLoggedIn() {
    console.log('not logged in already')

    if (!!localStorage && localStorage.getItem(USER_STORAGE_KEY)) {
      return true
    }
    return inject(Router).createUrlTree(['/login'])
  }

  
  shouldLoggedIn() {
    console.log('not logged in already')

    if (!localStorage.getItem(USER_STORAGE_KEY)) {
      console.log('not logged in already')
      return true
    }
    return inject(Router).createUrlTree(['/dashboard'])
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
}
