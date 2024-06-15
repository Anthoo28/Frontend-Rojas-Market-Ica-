import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../Model/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  baseUrl: string = "http://localhost:4940/venta";

  constructor(private http: HttpClient) { }

  getAllWithDetails(): Observable<Venta[]> {
    return this.http.get<Venta[]>('/venta/listaventa');
  }

  getAll(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.baseUrl + "/listaventa");
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/eliminarventa/" + id);
  }

  save(venta: Venta): Observable<Venta> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
      return this.http.post<Venta>(this.baseUrl + "/crearventa", JSON.stringify(venta), { headers: headers });
    }
}
