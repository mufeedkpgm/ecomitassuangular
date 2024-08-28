import { Injectable } from '@angular/core';

const TOKEN ='ecom-token';
const USER = 'ecom-user'

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token : string): void{ 
      console.log('Saving token:', token);
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }

  public saveUser(user): void{ 
      console.log('Saving user:', user);
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
}

