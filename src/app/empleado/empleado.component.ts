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
      { field: 'id', header: 'ID' },
      { field: 'roles[0].name', header: 'Cargo' },
      { field: 'fulldate', header: 'Nombres Completos' },
      { field: 'correo', header: 'Correo Personal' },
      { field: 'contrasena', header: 'Contraseña' },
      {field:'username', header:'Username'}
    ];
    

    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
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


  

}
