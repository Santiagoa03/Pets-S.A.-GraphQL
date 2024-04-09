import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../interfaces/cliente.interface';
import { DialogDataCliente } from '../../../interfaces/dialog-data-cliente.interface';
import { ErrorService } from '../../../services/errores.service';
import { NotificationService } from '../../../services/notification.service';
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrl: './agregar-cliente.component.css',
})
export class AgregarClienteComponent implements OnInit {
  form: FormGroup;

  inputdata: any;
  editdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCliente,
    private ref: MatDialogRef<AgregarClienteComponent>,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    public readonly errorService: ErrorService,
    private notificacionService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      cedula: [
        {
          value: this.data.edit ? this.data.data?.cedula : '',
          disabled: this.data.edit,
        },
        [Validators.required, Validators.pattern(/^([0-9])*$/)],
      ],
      nombre: [
        this.data.edit ? this.data.data?.nombres : '',
        [Validators.required, Validators.maxLength(20)],
      ],
      apellido: [
        this.data.edit ? this.data.data?.apellidos : '',
        [Validators.required, Validators.maxLength(30)],
      ],
      telefono: [
        this.data.edit ? this.data.data?.telefono : '',
        [Validators.required, Validators.pattern(/^([0-9])*$/)],
      ],
      correo: [
        this.data.edit ? this.data.data?.correo : '',
        [
          Validators.required,
          Validators.pattern(
            "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
          ),
        ],
      ],
      direccion: [
        this.data.edit ? this.data.data?.direccion : '',
        Validators.required,
      ],
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  guardarCliente() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const clienteNuevo: Cliente = this.obtenerDatosForm();

    this.loadingService.show();
    this.clienteService
      .guardarCliente(clienteNuevo)
      .subscribe({
        next: () => {
          this.notificacionService.openSnackBar(
            'Cliente Agregado Exitosamente',
            'right',
            'top',
            2000
          );
          this.closepopup();
        },
        error: () => {
          this.notificacionService.openSnackBar(
            'Error Al Guardar El Cliente',
            'right',
            'top',
            2000
          );
        },
      })
      .add(() => this.loadingService.hide());
  }

  editarCliente() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const clienteEditado: Cliente = this.obtenerDatosForm();
    clienteEditado.cedula = this.data.data?.cedula ?? '0';

    this.loadingService.show();
    this.clienteService
      .editarCliente(clienteEditado)
      .subscribe({
        next: () => {
          this.notificacionService.openSnackBar(
            'Cliente Editado Exitosamente',
            'right',
            'top',
            2000
          );
          this.closepopup();
        },
        error: () => {
          this.notificacionService.openSnackBar(
            'Error Al Editar El Cliente',
            'right',
            'top',
            2000
          );
        },
      })
      .add(() => this.loadingService.hide());
  }

  obtenerDatosForm(): Cliente {
    const { cedula, nombre, apellido, telefono, correo, direccion } =
      this.form.value;

    const cliente: Cliente = {
      nombres: nombre,
      apellidos: apellido,
      cedula,
      telefono,
      correo,
      direccion,
    };

    return cliente;
  }
}
