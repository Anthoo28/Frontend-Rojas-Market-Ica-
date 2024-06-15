import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

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

            // Mostrar mensaje en el Toast cuando el inicio de sesión es exitoso
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Bienvenido',
            });

            // Retraso de 2 segundos antes de redirigir al usuario
            setTimeout(() => {
              if (userRole === 'ADMIN') {
                this.router.navigate(['/admin']);
              } else if (userRole === 'EMPLEADO') {
                this.router.navigate(['/user-dashboard']);
              } else {
                this.router.navigate(['/login']);
              }
            }, 2000); // 2000 milisegundos = 2 segundos
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