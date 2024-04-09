import { Mascota } from './mascota.interfa';
import { Medicamento } from './medicamento.inteface';

export interface Receta {
  id?: number;
  medicamento: Medicamento;
  mascota: Mascota;
}
