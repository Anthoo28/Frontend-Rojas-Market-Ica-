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



@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    ClienteComponent,
    ProveedorComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    CalendarModule,
    TableModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    [MessageService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
