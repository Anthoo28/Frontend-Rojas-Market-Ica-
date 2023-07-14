export class Empleado {
    constructor(
      public id_empleado: number|null,
     public cargo: string|null,
      public fulldate_empleado: string | null,
      public edad_empleado: number|null,
      public correo_empleado: string |null,
      public contrasena_empleado: string |null
    ) {}
  }