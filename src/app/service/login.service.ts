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
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  };


  constructor(private http:HttpClient) { }

  //generamos el token
  public generateToken(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}login`, loginData);
  }
  
  
  public getCurrentUser(){
    return this.http.get(`${this.myAppUrl}actual-usuario`);
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerramos sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.clear();
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
