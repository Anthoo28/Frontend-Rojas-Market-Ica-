import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../Model/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    baseUrl: string = "http://localhost:4940/producto";
  
    constructor(private http: HttpClient) { }
  
    getAll(): Observable<any> {
      return this.http.get(this.baseUrl + "/lista");
    }
  
    save(producto: Producto): Observable<any> {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
     
      return this.http.post(this.baseUrl + "/save", JSON.stringify(producto), { headers: headers });
  }
  
  update(id:number ,producto:Producto): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put(this.baseUrl + "/update/" + id, JSON.stringify(producto), { headers: headers });
  }
  
  
  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/eliminar/"+id);
  }
  }
  
