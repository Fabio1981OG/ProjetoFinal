import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../model/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();
  private readonly baseUrl = 'http://localhost:8080/login'


  constructor(
    private http: HttpClient,
    private router: Router
    ) { }


  authenticate(creds: Credenciais) {
    return this.http.post(`${this.baseUrl}`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }


  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }


  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }
}
