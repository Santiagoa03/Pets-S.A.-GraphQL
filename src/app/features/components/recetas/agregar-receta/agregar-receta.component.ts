import { Receta } from './../../../interfaces/receta.inteface';
import { Component, Inject, OnInit } from '@angular/core';
import { DialogDataReceta } from '../../../interfaces/dialog-data-receta.interface';
import { RecetaService } from '../../../services/receta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from '../../../services/errores.service';
import { NotificationService } from '../../../services/notification.service';
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrl: './agregar-receta.component.css',
})
export class AgregarRecetaComponent implements OnInit {
  form: FormGroup;

  inputdata: any;
  editdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataReceta,
    private ref: MatDialogRef<AgregarRecetaComponent>,
    private fb: FormBuilder,
    private recetaService: RecetaService,
    public readonly errorService: ErrorService,
    private notificacionService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      medicamento: [
        this.data.edit ? this.data.data?.medicamento.id : '',
        [Validators.required, Validators.maxLength(15)],
      ],
      mascota: [
        this.data.edit ? this.data.data?.mascota.id_mascota : '',
        [Validators.required, Validators.maxLength(15)],
      ],
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  guardarReceta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const recetaNueva: Receta = this.obtenerDatosForm();

    this.loadingService.show();
    this.recetaService
      .guardarReceta(recetaNueva)
      .subscribe({
        next: () => {
          this.notificacionService.openSnackBar(
            'Receta Guardada Exitosamente',
            'right',
            'top',
            2000
          );
          this.closepopup();
        },
        error: () => {
          this.notificacionService.openSnackBar(
            'Error Al Agregar Receta',
            'right',
            'top',
            2000
          );
        },
      })
      .add(() => this.loadingService.hide());
  }

  obtenerDatosForm(): Receta {
    const { medicamento, mascota } = this.form.value;

    const receta: Receta = {
      medicamento,
      mascota,
    };

    return receta;
  }
}
