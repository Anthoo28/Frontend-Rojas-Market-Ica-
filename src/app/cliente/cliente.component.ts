import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Cliente } from '../Model/Cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ClienteComponent implements OnInit {
  confirmationService: ConfirmationService;
  clientes: Cliente[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog = false;
  selectCliente: Cliente | null = null;
  isNewCliente = false;

  clienteForm = new FormGroup({
    dni_cliente: new FormControl(),
    nombre_cliente: new FormControl(),
    correo_cliente: new FormControl(),
    telefono_cliente: new FormControl(),
  });

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    confirmationService: ConfirmationService,
  ) {
    this.confirmationService = confirmationService;
  }

  ngOnInit() {
    this.getAll();
    this.cols = [
      { field: 'id_cliente', header: 'ID' },
      { field: 'dni_cliente', header: 'DNI' },
      { field: 'nombre_cliente', header: 'Nombres Completos' },
      { field: 'correo_cliente', header: 'Correo' },
      { field: 'telefono_cliente', header: 'Telefono' },
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
    this.clienteService.getAll().subscribe(
      (result: any) => {
        this.clientes = result as Cliente[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showSaveDialog(editMode: boolean) {
    this.isNewCliente = !editMode;
    this.displaySaveDialog = true;
  
    if (editMode && this.selectCliente) {

      this.clienteForm.patchValue(this.selectCliente);
    } else {

      this.clienteForm.reset();
    }
  }
  

  saveCliente() {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }
  
    const cliente = this.clienteForm.value as Cliente;
  
    // Verificar si ya existe un cliente con el mismo dni_cliente
    const isDuplicate = this.clientes.some(c => c.dni_cliente === cliente.dni_cliente);
    if (isDuplicate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ya existe un cliente con el mismo DNI.',
      });
      return;
    }
  
    this.clienteService.save(cliente).subscribe(
      (result: any) => {
        this.clientes.push(result as Cliente);
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
  
    this.clienteForm.reset();
    window.location.reload();
  }
  
  updateCliente() {
    if (this.clienteForm.invalid || !this.selectCliente) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const cliente = this.clienteForm.value as Cliente;
    cliente.id_cliente = this.selectCliente?.id_cliente!;

    this.clienteService.update(cliente.id_cliente, cliente).subscribe(
      (result: any) => {
        const index = this.clientes.findIndex(
          (c) => c.id_cliente === this.selectCliente!.id_cliente
        );
        if (index !== -1) {
          this.clientes[index] = result as Cliente;
        }

        this.displaySaveDialog = false;
        this.selectCliente = null;


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
    this.clienteForm.reset();
    window.location.reload();
  }

  saveOrUpdate() {
    if (this.isNewCliente) {
      // Guardar un nuevo cliente
      this.saveCliente();
    } else {
      // Actualizar un cliente existente
      this.updateCliente();
    }
  }

  editarCliente(cliente: Cliente) {
    this.selectCliente = cliente;
    this.clienteForm.patchValue(cliente);
    this.showSaveDialog(true);
  }

  deleteCliente(id: number) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar este cliente?'
    );
    if (!confirmDelete) {
      return;
    }

    this.clienteService.delete(id).subscribe(
      (result: any) => {
        this.clientes = this.clientes.filter(
          (cliente) => cliente.id_cliente !== id
        );
      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Cliente eliminado.',
      life: 3000,
    });
    window.location.reload;
  }
}
