import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Model/Cliente';
import { MenuItem, MessageService } from 'primeng/api';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [MessageService]
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;

  cliente: Cliente = {
    id_cliente:null,
    nombre_cliente:"",
   correo_cliente:"",
   telefono_cliente:""
  };

  constructor(private clienteService: ClienteService, private messageService: MessageService) {}

  getAll() {
    this.clienteService.getAll().subscribe(
      (result: any) => {
        let clientes: Cliente[] = [];
        for (let i = 0; i < result.length; i++) {
          let cliente = result[i] as Cliente;
          clientes.push(cliente);
        }
        this.clientes = clientes;
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
    this.clienteService.save(this.cliente).subscribe(
      (result: any) => {
        console.log(result);
        let cliente = result as Cliente;
        this.clientes.push(cliente);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cliente registrado.' });
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
      { field: 'id_cliente', header: 'DNI' },
      { field: 'nombre_cliente', header: 'Nombres Completos' },
      { field: 'correo_cliente', header: 'Correo' },
      { field: 'telefono_cliente', header: 'Telefono' },
  
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
      {
        label: 'Eliminar',
        icon: 'pi-delete-left  '
      }
    ];
  }
}
