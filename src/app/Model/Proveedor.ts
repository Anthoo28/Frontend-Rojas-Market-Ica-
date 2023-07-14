export class Proveedor{
    constructor(
        public id_proveedor:number|null,
        public ruc_proveedor:string|null,
        public nombre_proveedor:string|null,
       public descripcion_proveedor:string|null,
       public telefono_proveedor:string|null
    ){}
}