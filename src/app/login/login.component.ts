import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmpleadoService } from '../service/empleado.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { LoginService } from '../service/login.service';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginData = {
    correo: '',
    contrasena: '',
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      correo: [''],
      contrasena: [''],
    });
  }

  ngOnInit(): void {}

  formSubmit() {
    this.loginData = {
      correo: this.form.value.correo,
      contrasena: this.form.value.contrasena,
    };
    console.log('Datos enviados al backend:', this.loginData);
  
    this.loginService.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe({
          next: (user: any) => {
            this.loginService.setUser(user);
            if (this.loginService.getUserRole() == 'ADMIN') {
              //dashboard admin
              this.router.navigate(['dashboard']);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bienvenido' });
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() == 'EMPLEADO') {
              //user principal
              this.router.navigate(['principal']);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logeo Exitoso' });
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.router.navigate(['login']);
            }
          },
          error: (e) => {
          },
        });
      },
      error: (e) => {
        console.log('Error al generar el token:', e);
        console.log('Detalles del error:', e.error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Detalles invalidos' });
      },
    });
  }
  
}
