import { DialogData } from './dialog-data.interface';
import { Medicamento } from './medicamento.inteface';

export interface DialogDataMedicamento extends DialogData {
  data: Medicamento;
}
