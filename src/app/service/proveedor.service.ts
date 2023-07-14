import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../Model/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  baseUrl: string = "http://localhost:4940/proveedor";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + "/lista");
  }

  save(proveedor: Proveedor): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
   
    return this.http.post(this.baseUrl + "/save", JSON.stringify(proveedor), { headers: headers });
}

update(id:number ,proveedor:Proveedor): Observable<any> {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.put(this.baseUrl + "/update/" + id, JSON.stringify(proveedor), { headers: headers });
}


delete(id: number): Observable<any> {
  return this.http.delete(this.baseUrl + "/eliminar/"+id);
}
}
