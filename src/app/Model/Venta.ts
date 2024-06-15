import { DetalleVenta } from "./DetalleVenta";
import { Empleado } from "./Empleado";
import { Cliente } from "./Cliente"; // Importar la clase Cliente

export class Venta {
  idVenta?: number;
  fechaVenta?: Date;
  empleado?: Empleado;
  cliente?: Cliente;
  estado?: string;
  total?: number;
  
  cantidad?: number;
  detallesVenta: DetalleVenta[] = []; // Add the detallesVenta property
}