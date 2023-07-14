import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'RojasMarket';

  items: MenuItem[] =[];

    ngOnInit() {
        this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/producto' },
          { label: 'Cliente', icon: 'pi pi-fw pi-users', routerLink: '/cliente' },
          { label: 'Empleado', icon: 'pi pi-fw pi-id-card', routerLink: '/empleado' },
          { label: 'Producto', icon: 'pi pi-fw pi-box', routerLink: '/producto' },
          { label: 'Proveedor', icon: 'pi pi-fw pi-truck', routerLink: '/proveedor' },
          {label: 'Venta', icon: 'pi pi-fw pi-cart-plus', routerLink: '/venta'},
          {label: 'login', icon: 'pi pi-fw pi-user', routerLink: '/login'}
    
        ];
    }

}
