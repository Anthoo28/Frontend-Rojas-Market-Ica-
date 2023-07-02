import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../service/empleado.service';

import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Empleado } from '../Model/Empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [MessageService]
})
export class EmpleadoComponent implements OnInit {

  empleados: Empleado[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;

  empleado: Empleado = {
    cargo: {
      id_cargo: null
    },
    fulldate_empleado: "",
    edad_empleado: null,
    correo_empleado: "",
    contrasena_empleado: ""
  };

  constructor(private empleadoService: EmpleadoService, private messageService: MessageService) {}

  getAll() {
    this.empleadoService.getAll().subscribe(
      (result: any) => {
        let empleados: Empleado[] = [];
        for (let i = 0; i < result.length; i++) {
          let empleado = result[i] as Empleado;
          empleados.push(empleado);
        }
        this.empleados = empleados;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showSaveDialog() {
    this.displaySaveDialog = true;
  }

  save() {
    this.empleadoService.save(this.empleado).subscribe(
      (result: any) => {
        console.log(result);
        let empleado = result as Empleado;
        this.empleados.push(empleado);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado registrado.' });
        this.displaySaveDialog = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.getAll();
    this.cols = [
      { field: 'id_empleado', header: 'ID' },
      { field: 'fulldate_empleado', header: 'Nombres Completos' },
      { field: 'edad_empleado', header: 'Edad' },
      { field: 'correo_empleado', header: 'Correo Personal' },
      { field: 'contrasena_empleado', header: 'Contraseña' },
      { field: 'fecha_registro', header: 'Fecha de Ingreso' },
      { field: 'cargo.nombre_cargo', header: 'Cargo' },
    ];

    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
      },
    ];
  }
}
