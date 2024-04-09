import { Cliente } from './cliente.interface';
import { DialogData } from './dialog-data.interface';
import { Mascota } from './mascota.interfa';

export interface DialogDataMascota extends DialogData {
  data?: Mascota;
  clientes: Cliente[];
}
