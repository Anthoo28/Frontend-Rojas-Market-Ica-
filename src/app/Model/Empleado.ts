export class Empleado {
    constructor(
      public cargo: {
        id_cargo: number|null;
      },
      public fulldate_empleado: string | null,
      public edad_empleado: number|null,
      public correo_empleado: string |null,
      public contrasena_empleado: string |null
    ) {}
  }