import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../Model/Proveedor';
import { MenuItem, MessageService } from 'primeng/api';
import { ProveedorService } from '../service/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [MessageService]
})
export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;

  proveedor: Proveedor = {
   ruc_proveedor:"",
       nombre_proveedor:"",
      descripcion_proveedor:"",
    telefono_proveedor:""
  };

  constructor(private proveedorService: ProveedorService, private messageService: MessageService) {}

  getAll() {
    this.proveedorService.getAll().subscribe(
      (result: any) => {
        let proveedores: Proveedor[] = [];
        for (let i = 0; i < result.length; i++) {
          let proveedor = result[i] as Proveedor;
          proveedores.push(proveedor);
        }
        this.proveedores = proveedores;
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
    this.proveedorService.save(this.proveedor).subscribe(
      (result: any) => {
        console.log(result);
        let proveedor = result as Proveedor;
        this.proveedores.push(proveedor);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Proveedor registrado.' });
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
      { field: 'id_proveedor', header: 'ID ' },
      { field: 'ruc_proveedor', header: 'RUC' },
      { field: 'nombre_proveedor', header: 'Nombre' },
      { field: 'descripcion_proveedor', header: 'Descripcion' },
      { field: 'telefono_proveedor', header: 'Telefono' }
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
