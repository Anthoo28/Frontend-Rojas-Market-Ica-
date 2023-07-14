import { Component, OnInit } from '@angular/core';
import { Venta } from '../Model/Venta';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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

  ventaForm: FormGroup;

  selectedDetalleVenta: DetalleVenta | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private ventaService: VentaService,
    private messageService: MessageService,
    confirmationService: ConfirmationService
  ) {
    this.confirmationService = confirmationService;
    this.ventaForm = this.formBuilder.group({
      idEmp: [null, Validators.required],
      dniCli: [null, Validators.required],
      productoCantidadList: [null, Validators.required]
    });
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
    this.displaySaveDialog = true;
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
    const detallesVenta = venta?.detallesVenta || [];
    const options = detallesVenta.map(detalle => ({
      label: `${detalle?.cantidad} - ${detalle?.precio_producto}`,
      value: detalle
    }));
    
    return options;
  }
  
  saveVenta() {
    if (this.ventaForm.invalid) {
      this.ventaForm.markAllAsTouched();
      return;
    }

    const idEmp = this.ventaForm.get('idEmp')?.value;
    const dniCli = this.ventaForm.get('dniCli')?.value;
    const productoCantidadList = this.ventaForm.get('productoCantidadList')?.value;

    console.log('Datos a enviar al backend:');
    console.log('idEmp:', idEmp);
    console.log('dniCli:', dniCli);
    console.log('productoCantidadList:', productoCantidadList);

    if (productoCantidadList) {
      const detallesVenta: DetalleVenta[] = productoCantidadList.split(';').map((item: string) => {
        const [productoId, cantidad] = item.split(',');
        const detalleVenta: DetalleVenta = {
          id_dventa: null,
          venta: null,
          producto: {
            id_producto: null
          },
          cantidad: +cantidad,
          precio_producto: null,
          subTotal: null,
          igv: null,
          totalVenta: null
        };
        return detalleVenta;
      });

      const venta: Venta = new Venta(
        null,
        null,
        idEmp,
        dniCli,
        detallesVenta,
        null
      );

      this.ventaService.save(venta).subscribe(
        (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Venta registrada.'
          });
          this.displaySaveDialog = false;
          this.ventaForm.reset();
          window.location.reload();
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al guardar la venta.'
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La lista de productos y cantidades es requerida.'
      });
    }
  }
}
