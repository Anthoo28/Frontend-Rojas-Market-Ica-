import { Producto } from "./Producto";
import { Venta } from "./Venta";

export interface DetalleVenta {
    id_dventa: number|null;
    venta: Venta|null;
    producto:{
      id_producto:number|null
    };
    cantidad: number|null;
    precio_producto: number|null;
    subTotal: number|null;
    igv: number|null;
    totalVenta: number|null;
  }
  