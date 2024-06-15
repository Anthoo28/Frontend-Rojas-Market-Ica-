import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/enviromments/enviromments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private myAppUrl: string = environment.endpoint;

 
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public generateToken(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}login`, loginData);
  }

  public getCurrentUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };

    return this.http.get(`${this.myAppUrl}actual-usuario`, httpOptions);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    return !!tokenStr;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  public getUserRole() {
    let user = this.getUser();
    return user?.roles?.length > 0 ? user.roles[0].name : null;
  }
  
  

}
