import { Cliente } from './cliente.interface';

export interface Mascota {
  id_mascota?: number;
  nombre: string;
  raza: string;
  edad: number;
  peso: number;
  cedula_cliente: Cliente | string;
}
