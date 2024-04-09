import { Cliente } from "./cliente.interface";
import { DialogData } from "./dialog-data.interface";

export interface DialogDataCliente extends DialogData {
  data: Cliente;
}
