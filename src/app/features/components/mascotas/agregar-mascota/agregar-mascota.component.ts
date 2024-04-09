import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '../../../interfaces/mascota.interfa';
import { DialogDataMascota } from '../../../interfaces/dialog-data-mascota.interface';
import { ErrorService } from '../../../services/errores.service';
import { NotificationService } from '../../../services/notification.service';
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrl: './agregar-mascota.component.css',
})
export class AgregarMascotaComponent implements OnInit {
  form: FormGroup;

  inputdata: any;
  editdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataMascota,
    private ref: MatDialogRef<AgregarMascotaComponent>,
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    public readonly errorService: ErrorService,
    private notificacionService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      nombre: [
        this.data.edit ? this.data.data?.nombre : '',
        [Validators.required, Validators.maxLength(20)],
      ],
      edad: [
        this.data.edit ? this.data.data?.edad : '',
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(/^([0-9])*$/),
        ],
      ],
      raza: [
        this.data.edit ? this.data.data?.raza : '',
        [Validators.required, Validators.maxLength(200)],
      ],
      cliente: [
        this.data.edit
          ? typeof this.data.data?.cedula_cliente === 'string'
            ? this.data.data?.cedula_cliente
            : this.data.data?.cedula_cliente?.cedula
          : '',
        Validators.required,
      ],
      peso: [
        this.data.edit ? this.data.data?.peso : '',
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern(/^([0-9])*$/),
      ],
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  guardarMascota() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const mascotaNueva: Mascota = this.obtenerDatosForm();

    this.loadingService.show();
    this.mascotaService
      .guardarMascota(mascotaNueva)
      .subscribe({
        next: () => {
          this.notificacionService.openSnackBar(
            'Mascota Agregada Exitosamente ',
            'right',
            'top',
            2000
          );
          this.closepopup();
        },
        error: () => {
          this.notificacionService.openSnackBar(
            'Error Al Agregar Mascota',
            'right',
            'top',
            2000
          );
        },
      })
      .add(() => this.loadingService.hide());
  }

  editarMascota() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const mascotaEditada: Mascota = this.obtenerDatosForm();
    mascotaEditada.id_mascota = this.data.data?.id_mascota ?? 0;

    this.loadingService.show();
    this.mascotaService
      .editarMascota(mascotaEditada)
      .subscribe({
        next: (response) => {
          this.notificacionService.openSnackBar(
            'Mascota Editada Exitosamente ',
            'right',
            'top',
            2000
          );
          this.closepopup();
        },
        error: () => {
          this.notificacionService.openSnackBar(
            'Error Al Editar Mascota',
            'right',
            'top',
            2000
          );
        },
      })
      .add(() => this.loadingService.hide());
  }

  obtenerDatosForm(): Mascota {
    const { nombre, edad, raza, cliente, peso } = this.form.value;

    const mascota: Mascota = {
      nombre,
      edad: Number(edad),
      raza,
      cedula_cliente: cliente,
      peso: Number(peso),
    };

    return mascota;
  }
}
