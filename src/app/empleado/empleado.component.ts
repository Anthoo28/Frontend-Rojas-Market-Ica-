import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../service/empleado.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Empleado } from '../Model/Empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class EmpleadoComponent implements OnInit {
  confirmationService: ConfirmationService;
  opcionesCargo: string[] = ['Administrador', 'Empleado'];
  empleado: Empleado = {
    id: 0,
    fulldate: null,
    correo: '',
    edad: 0,
    contrasena: '',
    username: null,
    roles: []
  };
  empleados: Empleado[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog = false;
  showPassword: boolean = false;
  selectEmpleado: Empleado | null = null;
  isNewEmpleado = false;

  empleadoForm = new FormGroup({
    cargo: new FormControl(),
    edad: new FormControl(),
    fulldate: new FormControl(),
    correo: new FormControl(),
    contrasena: new FormControl(),
    username: new FormControl()
  });

  // Función para alternar la visibilidad de la contraseña:
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Administrador':
        return 'success';
      case 'Empleado':
        return 'warning';
      default:
        return 'info';
    }
  }

  constructor(
    private empleadoService: EmpleadoService,
    private messageService: MessageService,
    confirmationService: ConfirmationService,
  ) {
    this.confirmationService = confirmationService;
  }

  ngOnInit() {
    this.getAll();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'roles[0].name', header: 'Cargo' },
      { field: 'fulldate', header: 'Nombres Completos' },
      { field: 'correo', header: 'Correo Personal' },
      { field: 'contrasena', header: 'Contraseña' },
      { field: 'username', header: 'Username' }
    ];

    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-plus',
      },
    ];
  }

  getAll() {
    this.empleadoService.getAll().subscribe(
      (result: any) => {
        this.empleados = result as Empleado[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showSaveDialog(editMode: boolean) {
    this.isNewEmpleado = !editMode;
    this.displaySaveDialog = true;

    if (editMode && this.selectEmpleado) {
      this.empleadoForm.patchValue(this.selectEmpleado);
    } else {
      this.empleadoForm.reset();
    }
  }

  saveEmpleado() {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    const empleado = this.empleadoForm.value as Empleado;

    // Verificar si ya existe un empleado con el mismo dni_empleado
    const isDuplicate = this.empleados.some(c => c.id === empleado.id);
    if (isDuplicate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ya existe un empleado con el mismo DNI.',
      });
      return;
    }

    this.empleadoService.save(empleado).subscribe(
      (result: any) => {
        // Resto del código existente

        this.displaySaveDialog = false; // Cierra el pop-up después de guardar
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Empleado registrado.',
        });
      },
      (error) => {
        // Resto del código existente
      }
    );
  }

  updateEmpleado() {
    if (this.empleadoForm.invalid || !this.selectEmpleado) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    const empleado = this.empleadoForm.value as Empleado;
    empleado.id = this.selectEmpleado?.id!;

    this.empleadoService.update(empleado.id, empleado).subscribe(
      (result: any) => {
        const index = this.empleados.findIndex(
          (c) => c.id === this.selectEmpleado!.id
        );
        if (index !== -1) {
          this.empleados[index] = result as Empleado;
        }

        this.displaySaveDialog = false; // Cierra el pop-up después de actualizar
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Empleado actualizado.',
        });
        this.empleadoForm.reset();
      },
      (error) => {
        console.log(error); // Agregamos este console.log para ver los posibles errores
      }
    );
  }


  saveOrUpdate() {
    if (this.isNewEmpleado) {
      // Guardar un nuevo empleado
      this.saveEmpleado();
    } else {
      // Actualizar un empleado existente
      this.updateEmpleado();
    }
  }

  editEmpleado(empleado: Empleado) {
    if (!empleado) {
      return; // Si empleado es null, salir de la función
    }

    this.selectEmpleado = empleado; // Clonamos el objeto para evitar modificar el objeto original
    this.empleadoForm.patchValue(empleado); // Asignamos los valores al formulario
    this.showPassword = false; // Reiniciamos el estado de la visibilidad de la contraseña
    this.isNewEmpleado = false; // Indicamos que estamos en modo edición
    this.displaySaveDialog = true; // Mostramos el diálogo de edición
  }

  deleteEmpleado(empleado: Empleado) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar este Empleado?'
    );
    if (!confirmDelete) {
      return;
    }

    console.log("Empleado a eliminar:", empleado);

    this.empleadoService.delete(empleado.id).subscribe(
      (result: any) => {
        this.empleados = this.empleados.filter(
          (emp) => emp.id !== empleado.id
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Empleado eliminado correctamente.',
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al eliminar el empleado.',
        });
      }
    );
  }
}
