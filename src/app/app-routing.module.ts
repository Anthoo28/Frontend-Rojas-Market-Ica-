import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AdminGuard } from './service/admin.guard';
import { DashboardComponent } from './admin/dashboard-admin/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { EmpleadoGuard } from './service/empleado.guard';
import { SuperGuard } from './service/super.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [EmpleadoGuard] },
  { path: 'empleado', component: EmpleadoComponent, canActivate: [AdminGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [SuperGuard] },
  { path: 'proveedor', component: ProveedorComponent, canActivate: [AdminGuard] },
  { path: 'producto', component: ProductoComponent, canActivate: [AdminGuard] },
  { path: 'venta', component: VentaComponent, canActivate: [SuperGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
