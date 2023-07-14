import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AdminGuard } from './service/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/producto', pathMatch: 'full' },
  { path: 'empleado', component: EmpleadoComponent, canActivate:[AdminGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate:[AdminGuard] },
  { path: 'proveedor', component: ProveedorComponent, canActivate:[AdminGuard] },
  { path: 'producto', component: ProductoComponent, canActivate:[AdminGuard] },
  { path: 'venta', component: VentaComponent, canActivate:[AdminGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
