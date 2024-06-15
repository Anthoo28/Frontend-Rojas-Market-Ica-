import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, map, shareReplay } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  menuItems: MenuItem[] = [];
  items: MenuItem[] = [];
  isLoggedIn = false;
  user: any = null;
  isSidebarVisible = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public login: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: this.login.getUser()?.username || '',
        items: [
          { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => this.logout() }
        ]
      }
    ];
  
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'Cliente', icon: 'pi pi-fw pi-users', routerLink: '/cliente' },
      { label: 'Empleado', icon: 'pi pi-fw pi-id-card', routerLink: '/empleado' },
      { label: 'Producto', icon: 'pi pi-fw pi-box', routerLink: '/producto' },
      { label: 'Proveedor', icon: 'pi pi-fw pi-truck', routerLink: '/proveedor' },
      { label: 'Venta', icon: 'pi pi-fw pi-cart-plus', routerLink: '/venta' }
    ];

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe({
      next: (data: any) => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      },
    });
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}


