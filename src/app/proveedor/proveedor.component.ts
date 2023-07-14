import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from '../Model/Proveedor';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ProveedorService } from '../service/proveedor.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProveedorComponent implements OnInit {
  confirmationService: ConfirmationService;
  proveedores: Proveedor[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog= false;
  selectProveedor: Proveedor | null = null;
  isNewProveedor = false;
  @ViewChild('dt') table: Table | undefined;

  proveedorForm = new FormGroup ({
   ruc_proveedor: new FormControl(),
       nombre_proveedor: new FormControl(),
      descripcion_proveedor:new FormControl(),
    telefono_proveedor: new FormControl()
  });

  constructor(private proveedorService: ProveedorService, private messageService: MessageService,confirmationService: ConfirmationService,) {
    this.confirmationService = confirmationService;
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
        command: () => this.showSaveDialog(false),
      }
    ];
  }

  //Codigo save, delete y update

  getAll() {
    this.proveedorService.getAll().subscribe(
      (result: any) => {
     this.proveedores = result as Proveedor[];
        },
      (error) => {
        console.log(error);
      }
    );
  }

  showSaveDialog(editMode: boolean) {
    this.isNewProveedor = !editMode;
    this.displaySaveDialog = true;
    if (editMode && this.selectProveedor) {

      this.proveedorForm.patchValue(this.selectProveedor);
    } else {

      this.proveedorForm.reset();
    }
  }

  saveProveedor() {
    if (this.proveedorForm.invalid) {
      this.proveedorForm.markAllAsTouched();
      return;
    }
  
    const proveedor = this.proveedorForm.value as Proveedor;
    this.proveedorService.save(proveedor).subscribe(
      (result: any) => {
        this.proveedores.push(result as Proveedor);
        this.displaySaveDialog = false;
  
    
      },
      (error) => {
        console.log(error);
      }
    );  this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Cliente registrado.',
    });
  
    this.proveedorForm.reset();
    window.location.reload();
  }


  updateProveedor() {
    if (this.proveedorForm.invalid || !this.selectProveedor) {
      this.proveedorForm.markAllAsTouched();
      return;
    }

    const proveedor = this.proveedorForm.value as Proveedor;
    proveedor.id_proveedor = this.selectProveedor?.id_proveedor!;

    this.proveedorService.update(proveedor.id_proveedor, proveedor).subscribe(
      (result: any) => {
        const index = this.proveedores.findIndex(
          (c) => c.id_proveedor === this.selectProveedor!.id_proveedor
        );
        if (index !== -1) {
          this.proveedores[index] = result as Proveedor;
        }

        this.displaySaveDialog = false;
        this.selectProveedor = null;


      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Proveedor actualizado.',
    });
    this.proveedorForm.reset();
    window.location.reload();
  }

  saveOrUpdate() {
    if (this.isNewProveedor) {
      // Guardar un nuevo cliente
      this.saveProveedor();
    } else {
      // Actualizar un cliente existente
      this.updateProveedor();
    }
  }

  editarProveedor(proveedor: Proveedor) {
    this.selectProveedor = proveedor;
    this.proveedorForm.patchValue(proveedor);
    this.showSaveDialog(true);
  }

  deleteProveedor(id: number) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar este proveedor?'
    );
    if (!confirmDelete) {
      return;
    }

    this.proveedorService.delete(id).subscribe(
      (result: any) => {
        this.proveedores = this.proveedores.filter(
          (proveedor) => proveedor.id_proveedor !== id
        );
      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Proveedor eliminado.',
      life: 3000,
    });
    window.location.reload();
  }
}


