import { Component, OnInit } from '@angular/core';
import { Venta } from '../Model/Venta';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentaService } from '../service/venta.service';
import { Producto } from '../Model/Producto';
import { ProductoService } from '../service/producto.service';
import { Cliente } from '../Model/Cliente';
import { ClienteService } from '../service/cliente.service';
import { Empleado } from '../Model/Empleado';
import { EmpleadoService } from '../service/empleado.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class VentaComponent implements OnInit {
  confirmationService: ConfirmationService;

  cols: any;
  items: MenuItem[] = [];
  displaySaveDialog = false;
  expandedRows: { [key: string]: boolean } = {};
  showForm: boolean = false;

  empleadoLogueado: Empleado | null = null;
  ventas: Venta[] = [];
  clientesRegistrados: Cliente[] = [];
  productos: Producto[] = [];
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private productoService: ProductoService,
    private clienteService: ClienteService,
    confirmationService: ConfirmationService
  ) {
    this.formGroup = this.fb.group({
      empleadoId: ['1', Validators.required],
      id_cliente: ['', Validators.required],
      id_producto: ['', Validators.required],
      detallesVenta: this.fb.array([]),
      cantidad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      estado: [''], // Agrega el campo 'estado' al formulario
    });
    this.confirmationService = confirmationService;
  }

  ngOnInit(): void {
    // Suscribirse al cambio en el campo "estado" para convertir el número a texto
    this.formGroup.get('estado')?.valueChanges.subscribe((value: any) => {
      // Definir la lógica de conversión del número al texto correspondiente
      switch (value) {
        case '1':
          this.formGroup.get('estado')?.setValue('Pendiente', { emitEvent: false });
          break;
        case '2':
          this.formGroup.get('estado')?.setValue('Aprobado', { emitEvent: false });
          break;
        case '3':
          this.formGroup.get('estado')?.setValue('Denegado', { emitEvent: false });
          break;
        default:
          // Si el valor ingresado no coincide con ningún número conocido, dejarlo como está
          break;
      }
    });
    // Obtener lista de productos desde el servicio
    this.productoService.getAll().subscribe(
      (data) => {
        this.productos = data; // Almacena la lista de productos en la variable 'productos'
      },
      (error) => {
        console.error('Error al obtener la lista de productos', error);
      }
    );

    this.cols = [
      { field: 'idVenta', header: 'N° de Venta' },
      { field: 'fechaVenta', header: 'Fecha de Venta' },
      { field: 'empleado.fulldate', header: 'Empleado' },
      { field: 'cliente.nombre_cliente', header: 'Cliente' },
      { field: 'estado', header: 'Estado' }, // Agrega la columna 'Estado'
      { field: 'total', header: 'Total' },
    ];

    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(),
      },
    ];
    this.getAll();
    this.getClientesRegistrados();
  }

  getClientesRegistrados() {
    this.clienteService.getAll().subscribe(
      (data) => {
        this.clientesRegistrados = data;
      },
      (error) => {
        console.error('Error al obtener la lista de clientes', error);
      }
    );
  }

  getAll() {
    this.ventaService.getAll().subscribe(
      (result: any) => {
        this.ventas = result as Venta[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Getter para acceder a los detalles de venta
  get detallesVentaFormArray() {
    return this.formGroup.get('detallesVenta') as FormArray;
  }

  agregarDetalleVenta() {
    const detalleFormGroup = this.fb.group({
      producto: {
        id_producto: ['', Validators.required],
        nombre_producto: '',
        precio_salida: '',
      },
      cantidad: ['', Validators.required],
      precio_unitario: ['', Validators.required],
    });
  
    // Agregar el detalleFormGroup al FormArray detallesVentaFormArray
    this.detallesVentaFormArray.push(detalleFormGroup);
  }

  removerDetalleVenta(index: number) {
    this.detallesVentaFormArray.removeAt(index);
  }

  crearVenta() {
    console.log('Formulario:', this.formGroup.value);
    if (this.formGroup.valid) {
      const estado = this.formGroup.value.estado;
      const detallesVenta = this.formGroup.value.detallesVenta;
  
      // Actualizar detallesVenta con los detalles correctos del producto utilizando id_producto
      for (const detalle of detallesVenta) {
        const productId = detalle.producto.id_producto;
        const selectedProduct = this.productos.find((producto) => producto.id_producto === productId);
        if (selectedProduct) {
          detalle.producto = {
            id_producto: selectedProduct.id_producto,
            nombre_producto: selectedProduct.nombre_producto,
            precio: selectedProduct.precio_salida_producto, // Asegúrate de que la propiedad sea 'precio' o ajusta el nombre según corresponda
          };
  
          // Actualizar el precio_unitario con el precio del producto seleccionado
          detalle.precio_unitario = selectedProduct.precio_salida_producto;
        }
      }
  
      const venta: Venta = {
        fechaVenta: new Date(), // Aquí puedes usar la fecha actual o la fecha que desees
        empleado: {
          id: this.formGroup.value.empleadoId,
        },
        detallesVenta: detallesVenta, // Usar el array actualizado de detallesVenta
        cliente: this.formGroup.value.id_cliente,
      };
  
      // Calcular el total en base a la cantidad y el precio_unitario en detallesVenta
      venta.total = detallesVenta.reduce((total: number, detalle: any) => total + detalle.cantidad * detalle.precio_unitario, 0);
  
      console.log('Venta que se enviará al backend:', venta);
  
      this.ventaService.save(venta).subscribe(
        (data) => {
          console.log('Venta creada exitosamente', data);
          this.formGroup.reset();
          this.detallesVentaFormArray.clear(); // Limpiar detallesVentaFormArray después de una venta exitosa
          this.displaySaveDialog = false; // Cerrar el diálogo de nueva venta después de crearla
          this.getAll(); // Actualizar la lista de ventas después de crear una nueva venta
        },
        (error) => {
          console.error('Error al crear la venta', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  

  isExpanded(venta: Venta): boolean {
    return venta?.idVenta ? !!this.expandedRows[venta.idVenta.toString()] : false;
  }

  toggleExpanded(venta: Venta): void {
    const ventaId = venta?.idVenta?.toString();
    if (ventaId) {
      this.expandedRows[ventaId] = !this.isExpanded(venta);
    }
  }

  getColumnValue(object: any, field: string): any {
    const fields = field.split('.');
    let value = object;
    for (const f of fields) {
      value = value?.[f];
    }

    if (field === 'estado' && typeof value === 'string') {
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return value;
  }

  showSaveDialog(): void {
    this.showForm = true;
    this.displaySaveDialog = true;
  }

  
}