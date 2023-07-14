import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../Model/Cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: string = "http://localhost:4940/cliente";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + "/lista");
  }

  save(cliente: Cliente): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
   
    return this.http.post(this.baseUrl + "/save", JSON.stringify(cliente), { headers: headers });
}
update(id:number ,cliente:Cliente): Observable<any> {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.put(this.baseUrl + "/update/" + id, JSON.stringify(cliente), { headers: headers });
}


delete(id: number): Observable<any> {
  return this.http.delete(this.baseUrl + "/eliminar/"+id);
}}