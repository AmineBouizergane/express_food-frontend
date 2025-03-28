import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.host+'/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<void> {
    return this.http.post<{token: string}>(this.apiUrl, { username, password })
      .pipe(map(response => {
        localStorage.setItem('jwtToken', response.token);
      }));
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles;
    }
    return [];
  }
}
