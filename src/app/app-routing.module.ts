import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AdminGuard } from './service/admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { EmpleadoGuard } from './service/empleado.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [EmpleadoGuard],
  },
  { 
    path: 'empleado', 
    component: EmpleadoComponent, 
  canActivate: [AdminGuard] 
},
  { 
    path: 'cliente',
   component: ClienteComponent,
   canActivate: [AdminGuard,EmpleadoGuard]
   },
  {
    path: 'proveedor',
    component: ProveedorComponent,
    canActivate: [AdminGuard],
  },
  { path: 'producto',
   component: ProductoComponent, 
   canActivate: [AdminGuard] },

  { path: 'venta', component: VentaComponent,canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
