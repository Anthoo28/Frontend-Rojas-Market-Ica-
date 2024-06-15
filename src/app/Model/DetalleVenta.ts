import { Producto } from "./Producto";
import { Venta } from "./Venta";

export interface DetalleVenta {
    id_dventa: number;
    venta: Venta;
    producto: Producto;
    cantidad: number;
    precio_producto: number;
    subTotal: number;
    igv: number;
    totalVenta: number;
  }
  