export class Producto{
    constructor(
public id_producto:number|null,
public proveedor:{
    id_proveedor:number|null
},
public nombre_producto:string,
public descripcion_producto:string,
public cantidad_producto:number|null,
public fecha_vencimiento:Date|null,
public precio_ingreso_producto:number|null,
public precio_salida_producto:number|null,
public stock_minimo_producto:number|null
 ){}
}