import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmpleadoService } from '../service/empleado.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { LoginService } from '../service/login.service';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    private router: Router
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

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token);
        console.log('Token guardado en localStorage:', localStorage.getItem('token'));

        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            console.log('Usuario actual:', user);
            console.log('Token generado:', data.token);
            this.loginService.setUser(user);

            const userRole = this.loginService.getUserRole();
            console.log('Rol del usuario:', userRole);

            if (userRole === 'ADMIN') {
              this.router.navigate(['/admin']);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Bienvenido',
              });
              this.loginService.loginStatusSubject.next(true);
            } else if (userRole === 'EMPLEADO') {
              this.router.navigate(['/user-dashboard']);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Logeo Exitoso',
              });
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.router.navigate(['/login']);
            }
          },
          (error: any) => {
            console.log('Error al obtener el usuario actual:', error);
          }
        );
      },
      (error: any) => {
        console.log('Error al generar el token:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credenciales inválidas',
        });
      }
    );
  }
}
