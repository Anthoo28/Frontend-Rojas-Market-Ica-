import { ERole } from "./Rol";


export interface Empleado {
  id: number;
  fulldate?: string | null;
  correo?: string;
  edad?: number,
  contrasena?: string;
  username?: string | null;
  roles?: Rol[];
}

export interface Rol {
  id: number;
  name: ERole;
}