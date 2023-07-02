import { Component, OnInit } from '@angular/core';
import { Producto } from '../Model/Producto';
import { MenuItem, MessageService } from 'primeng/api';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  productos: Producto[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;

  producto: Producto = {
    proveedor: {
      id_proveedor: null
    },
     nombre_producto:"",
 descripcion_producto:"",
 cantidad_producto:null,
 fecha_vencimiento:null,
 precio_ingreso_producto:null,
 precio_salida_producto:null,
 stock_minimo_producto:null
  };

  constructor(private productoService: ProductoService, private messageService: MessageService) {}

  getAll() {
    this.productoService.getAll().subscribe(
      (result: any) => {
        let productos: Producto[] = [];
        for (let i = 0; i < result.length; i++) {
          let producto = result[i] as Producto;
          productos.push(producto);
        }
        this.productos = productos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showSaveDialog():void {
    this.displaySaveDialog = true;
  }

  save() {
    this.productoService.save(this.producto).subscribe(
      (result: any) => {
        console.log(result);
        let producto = result as Producto;
        this.productos.push(producto);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Producto registrado.' });
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
      { field: 'id_producto', header: 'ID' },
      { field: 'proveedor.nombre_proveedor', header: 'Proveedor' },
      { field: 'nombre_producto', header: 'Nombre' },
      { field: 'descripcion_producto', header: 'descripcion_producto' },
      { field: 'cantidad_producto', header: 'Stock' },
      { field: 'fecha_vencimiento', header: 'Fecha de Vencimiento' },
      { field: 'precio_ingreso_producto', header: 'Precio Ingreso' },
      { field: 'precio_salida_producto', header: 'Precio Venta' },
      { field: 'stock_minimo_producto', header: 'Stock Minimo' }

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

