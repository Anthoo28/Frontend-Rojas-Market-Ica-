import { DetalleVenta } from "./DetalleVenta";

export class Venta{
    constructor(
       public id_venta: number|null,
       public fechaVenta: Date|null,
       public empleado:{
         id_emp: number|null},
        public dni_cli: number|null,
         public detallesVenta: DetalleVenta[],
         public total:number|null
    ){}
}