import { DialogData } from './dialog-data.interface';
import { Mascota } from './mascota.interfa';
import { Medicamento } from './medicamento.inteface';
import { Receta } from './receta.inteface';

export interface DialogDataReceta extends DialogData {
  data?: Receta;
  medicamentos: Medicamento[];
  mascotas: Mascota[];
}
