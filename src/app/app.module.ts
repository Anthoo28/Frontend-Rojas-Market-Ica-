import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { EmpleadoComponent } from './empleado/empleado.component'; 
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ClienteComponent } from './cliente/cliente.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { LoginComponent } from './login/login.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { TagModule } from 'primeng/tag';
import { VentaComponent } from './venta/venta.component';
import { authInterceptorProviders } from './service/auth.interceptor';
import { DashboardComponent } from './admin/dashboard-admin/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { NavbarComponent } from './Componet/navbar/navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { DashboardEmpleadoComponent } from './dashboard-empleado/dashboard-empleado.component';
import { EmpleadoService } from '../app/service/empleado.service'; // Reemplaza 'empleado.service' con la ruta correcta a tu servicio de empleados.
import { ClienteService } from './service/cliente.service';



@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    ClienteComponent,
    ProveedorComponent,
    ProductoComponent,
    LoginComponent,
    VentaComponent,
    NavbarComponent,
    DashboardComponent,
    UserDashboardComponent,
    DashboardEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    RouterModule,
    HttpClientModule,
    TagModule,
    MenuModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    TabMenuModule,
    PasswordModule,
    CalendarModule,
    TableModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    BrowserAnimationsModule,
    TieredMenuModule,
    CardModule
  ],
  providers: [
    [MessageService,
    authInterceptorProviders,
    EmpleadoService, ClienteService],
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
