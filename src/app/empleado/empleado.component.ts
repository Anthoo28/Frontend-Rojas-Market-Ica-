import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../service/empleado.service';
import { ConfirmationService, MenuItem ,MessageService} from 'primeng/api';
import { Empleado } from '../Model/Empleado';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [MessageService,ConfirmationService],
})
export class EmpleadoComponent implements OnInit {
  confirmationService: ConfirmationService;
  opcionesCargo: string[] = ['Administrador', 'Empleado'];
  empleado: any = {}; 
  empleados: Empleado[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  showPassword: boolean = false; 
  selectEmpleado: Empleado | null = null;
  isNewEmpleado = false;

  empleadoForm = new FormGroup({
    cargo: new FormControl(),
    fulldate_empleado: new FormControl(),
    edad_empleado: new FormControl(),
    correo_empleado: new FormControl(),
    contrasena_empleado: new FormControl(),
  });

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
      { field: 'id_empleado', header: 'ID' },
      { field: 'cargo', header: 'Cargo' },
      { field: 'fulldate_empleado', header: 'Nombres Completos' },
      { field: 'edad_empleado', header: 'Edad' },
      { field: 'correo_empleado', header: 'Correo Personal' },
      { field: 'contrasena_empleado', header: 'Contraseña' },
      { field: 'fecha_registro', header: 'Fecha de Ingreso' },
    ];

    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(false),
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

    empleado.cargo = this.empleadoForm.value.cargo ?? null;

    this.empleadoService.save(empleado).subscribe(
      (result: any) => {
        this.empleados.push(result as Empleado);
        this.displaySaveDialog = false;
      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Empleado registrado.',
    });
    this.displaySaveDialog = false;
    this.empleadoForm.reset();
    window.location.reload();
  }

  updateEmpleado() {
    if (this.empleadoForm.invalid || !this.selectEmpleado) {
      this.empleadoForm.markAllAsTouched();
      return;
    }
    
    const cliente = this.empleadoForm.value as Empleado;
    cliente.id_empleado = this.selectEmpleado?.id_empleado!;

    this.empleadoService.update(cliente.id_empleado, cliente).subscribe(
      (result: any) => {
        const index = this.empleados.findIndex(
          (c) => c.id_empleado === this.selectEmpleado!.id_empleado
        );
        if (index !== -1) {
          this.empleados[index] = result as Empleado;
        }

        this.displaySaveDialog = false;
        this.selectEmpleado = null;

      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Cliente actualizado.',
    });
    this.empleadoForm.reset();
    window.location.reload();
  }



  saveOrUpdate() {
    if (this.isNewEmpleado) {
      // Guardar un nuevo Empleado
      this.saveEmpleado();
    } else {
      // Actualizar un Empleado existente
      this.updateEmpleado();
    }
  }

  editarEmpleado(empleado: Empleado) {
    this.selectEmpleado = empleado;
    this.empleadoForm.patchValue(empleado);
    this.showSaveDialog(true);

  }

 
  deleteEmpleado(id: number) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar este cliente?'
    );
    if (!confirmDelete) {
      return;
    }

    this.empleadoService.delete(id).subscribe(
      (result: any) => {
        this.empleados = this.empleados.filter(
          (empleado) => empleado.id_empleado !== id
        );
      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'Error',
      summary: 'Exito',
      detail: 'Empleado eliminado.',
      life: 3000,
    });
    window.location.reload;
  }



}
