import { Component, OnInit } from '@angular/core';
import { Producto } from '../Model/Producto';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ProductoService } from '../service/producto.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ProveedorService } from '../service/proveedor.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [MessageService,ConfirmationService],
})
export class ProductoComponent implements OnInit{
  [x: string]: any;
  confirmationService: ConfirmationService;
  productos: Producto[] = [];
  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  isNewProducto = false;
  selectProducto: Producto | null = null;
  opcionesProveedor: any[] = [];

  productoForm = new FormGroup({
    id_proveedor: new FormControl(),
    nombre_producto: new FormControl(),
    descripcion_producto: new FormControl(),
    cantidad_producto: new FormControl(),
    fecha_vencimiento: new FormControl(),
    precio_ingreso_producto: new FormControl(),
    stock_minimo_producto: new FormControl(),
  });
  
  

  constructor(private productoService: ProductoService, private messageService: MessageService, confirmationService:ConfirmationService, private proveedorService:ProveedorService) {this.confirmationService=confirmationService}

  ngOnInit() {
    this.getAll();
    this.cargarProveedores();
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
        command: () => this.showSaveDialog(false),
      },
   
    ];
  }


  cargarProveedores() {
    this.proveedorService.getAll().subscribe(
      (proveedores: any[]) => {
        this.opcionesProveedor = proveedores.map((proveedor: any) => ({
          label: proveedor.nombre_proveedor,
          value: proveedor.id_proveedor
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getAll() {
    this.productoService.getAll().subscribe(
      (result: any) => {
        this.productos = result as Producto[];
      },
      (error) => {
        console.log(error);
      }
    );
  }


  showSaveDialog(editMode: boolean) {
    this.isNewProducto = !editMode;
    this.displaySaveDialog = true;
  
    if (editMode && this.selectProducto) {

      this.productoForm.patchValue(this.selectProducto);
    } else {

      this.productoForm.reset();
    }
  }



  saveProducto() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }
  
    const producto = {
      ...this.productoForm.value,
      proveedor: { id_proveedor: this.productoForm.value.id_proveedor }
    } as Producto;
  
    this.productoService.save(producto).subscribe(
      (result: any) => {
        this.productos.push(result as Producto);
        this.displaySaveDialog = false;
      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Producto registrado.'
    });
    this.displaySaveDialog = false;
    this.productoForm.reset();
    window.location.reload();
  }
  
  updateProducto() {
    if (this.productoForm.invalid || !this.selectProducto) {
      this.productoForm.markAllAsTouched();
      return;
    }
  
    const producto = {
      ...this.productoForm.value,
      proveedor: { id_proveedor: this.productoForm.value.id_proveedor }
    } as Producto;
    producto.id_producto = this.selectProducto?.id_producto!;
  
    this.productoService.update(producto.id_producto, producto).subscribe(
      (result: any) => {
        const index = this.productos.findIndex(
          (c) => c.id_producto === this.selectProducto!.id_producto
        );
        if (index !== -1) {
          this.productos[index] = result as Producto;
        }
  
        this.displaySaveDialog = false;
        this.selectProducto = null;
      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Producto actualizado.'
    });
    this.productoForm.reset();
    window.location.reload();
  }
  saveOrUpdate() {
    if (this.isNewProducto) {
      // Guardar un nuevo Empleado
      this.saveProducto();
    } else {
      // Actualizar un Empleado existente
      this.updateProducto();
    }
  }

  editarProducto(producto: Producto) {
    this.selectProducto = producto;
    this.productoForm.patchValue(producto);
    this.showSaveDialog(true);

  }

 
  deleteProducto(id: number) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar este Producto?'
    );
    if (!confirmDelete) {
      return;
    }

    this.productoService.delete(id).subscribe(
      (result: any) => {
        this.productos = this.productos.filter(
          (producto) => producto.id_producto !== id
        );
      },
      (error) => {
        console.log(error);
      }
    );
    this.messageService.add({
      severity: 'Error',
      summary: 'Exito',
      detail: 'Producto eliminado.',
      life: 3000,
    });
    window.location.reload;
  }

}

