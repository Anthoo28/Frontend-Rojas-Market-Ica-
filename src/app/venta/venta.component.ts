import { Component, OnInit } from '@angular/core';
import { Venta } from '../Model/Venta';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { VentaService } from '../service/venta.service';
import { DetalleVenta } from '../Model/DetalleVenta';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class VentaComponent implements OnInit {
  confirmationService: ConfirmationService;
  ventas: Venta[] = [];
  cols!: any[];
  items: MenuItem[] = [];
  displaySaveDialog = false;
  expandedRows: { [key: string]: boolean } = {};
  isNewProveedor = false;
  detalleCols: any[] = [];

  ventaForm = new FormGroup({
    idEmp: new FormControl(),
    dniCli: new FormControl(),
    productoCantidadList: new FormControl(),
  });

  selectedDetalleVenta: DetalleVenta | null = null;

  constructor(
    private ventaService: VentaService,
    private messageService: MessageService,
    confirmationService: ConfirmationService
  ) {
    this.confirmationService = confirmationService;
  }

  ngOnInit() {
    this.getAll();
    this.cols = [
      { field: 'id_venta', header: 'N° de Venta' },
      { field: 'fechaVenta', header: 'Fecha de Venta' },
      { field: 'id_emp', header: 'Empleado' },
      { field: 'dni_cli', header: 'Cliente' },
      {field: 'total', header: 'Total'}
    ];
    this.detalleCols = [
      { field: 'id_dventa', header: 'ID Detalle' },
      { field: 'producto.nombre_producto', header: 'Producto' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'precio_producto', header: 'Precio Unitario' },
      { field: 'subTotal', header: 'Subtotal' },
      { field: 'igv', header: 'igv 18%' },
      { field: 'totalVenta', header: 'Total' },
    ];
    
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(),
      },
    ];
  }

  isExpanded(venta: Venta): boolean {
    const ventaId = venta?.id_venta?.toString();
    return !!ventaId && this.expandedRows[ventaId];
  }
 
  toggleExpanded(venta: Venta): void {
    const ventaId = venta?.id_venta?.toString();
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
    return value;
  }
  
  showSaveDialog(): void {
    // Implementa la lógica para mostrar el diálogo de guardado
  }

  getAll() {
    this.ventaService.getAll().subscribe(
      (result: any) => {
        console.log(result);
        this.ventas = result as Venta[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDetalleVentaOptions(venta: Venta): any[] {
    // Obtener los detalles de venta de la venta actual
    const detallesVenta = venta?.detallesVenta || [];
    
    // Crear las opciones para el menú desplegable
    const options = detallesVenta.map(detalle => ({
      label: `${detalle?.cantidad} - ${detalle?.precio_producto}`,
      value: detalle
    }));
    
    return options;
  }
  
}