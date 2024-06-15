import { Producto } from "./Producto";

export interface DetalleVenta {
  id_dventa: number | null;
  cantidad: number;
  producto: Producto | null;
  id_producto: number | null; // Agregar el campo id_producto aquí
  nombre_producto: string;
}

