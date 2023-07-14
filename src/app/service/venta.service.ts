import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{Venta} from'../Model/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {


  baseUrl: string = "http://localhost:4940/venta";
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + "/lista");
  }

  save(venta: Venta): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
   
    return this.http.post(this.baseUrl + "/save", JSON.stringify(venta), { headers: headers });
}

delete(id: number): Observable<any> {
  return this.http.delete(this.baseUrl + "/eliminar/"+id);
}
}
