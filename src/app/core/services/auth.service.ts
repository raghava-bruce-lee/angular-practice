import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);

  fetchLoginStatusWithApi() {
    return this.httpClient.get('auth/login-status');
  }

  loginWithApi(email: string, password: string) {
    return this.httpClient.post('auth/login', { email, password });
  }
}
