import { ReporteService } from './../../services/reporte.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../interfaces/mascota.interfa';
import { ExcelService } from '../../services/excel.service';
import { ErrorService } from '../../services/errores.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { NotificationService } from '../../services/notification.service';
import { ClienteGraphqlService } from '../../services/graphQL/cliente.graphql.service';
import { MascotaGraphqlService } from '../../services/graphQL/mascota.graphql.service';
import { ReporteGraphqlService } from '../../services/graphQL/reporte.graphql.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaClientes: Cliente[] = [];
  listaMascotas: Mascota[] = [];

  form: FormGroup;

  constructor(
    private clienteGraphql: ClienteGraphqlService,
    private fb: FormBuilder,
    private mascotaGraphqlService: MascotaGraphqlService,
    private reporteGraphqlService: ReporteGraphqlService,
    private excelSercice: ExcelService,
    public readonly errorService: ErrorService,
    private notificacionService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
    this.consultarClientes();
    this.consultarMascotas();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      tipoReporte: ['', Validators.required],
      reporteCliente: ['', Validators.required],
      reporteMascota: ['', Validators.required],
    });
  }

  consultarClientes(): void {
    this.clienteGraphql.consultarClientes().subscribe({
      next: (response) => {
        this.listaClientes = response;
      },
      error: (error) => {
        this.listaClientes = [];
      },
    });
  }

  consultarMascotas(): void {
    this.mascotaGraphqlService.consultarMascotas().subscribe({
      next: (response) => {
        this.listaMascotas = response;
      },
      error: () => {
        this.listaMascotas = [];
      },
    });
  }

  validarCampos(): void {
    const tipoReporte = this.form.get('tipoReporte')?.value;
    if (tipoReporte === 'CLIENTE') {
      this.form.get('reporteCliente')?.setValidators([Validators.required]);
      this.form.get('reporteMascota')?.clearValidators();
    } else if (tipoReporte === 'RECETA') {
      this.form.get('reporteMascota')?.setValidators([Validators.required]);
      this.form.get('reporteCliente')?.clearValidators();
    }
    this.form.get('reporteCliente')?.updateValueAndValidity();
    this.form.get('reporteMascota')?.updateValueAndValidity();
  }

  generarReporte(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tipoReporte = this.form.get('tipoReporte')?.value;

    this.loadingService.show();
    if (tipoReporte === 'CLIENTE') {
      this.reporteGraphqlService
        .generarClientReport(this.form.get('reporteCliente')?.value)
        .subscribe({
          next: (response) => {
            const datosParaExcel = response[0].mascotas.map(
              (mascota: {
                descripcion_receta: any;
                dosis_receta: any;
                nombre_mascota: any;
              }) => ({
                apellidos_cliente: response[0].apellidos_cliente,
                cedula_cliente: response[0].cedula_cliente,
                nombres_cliente: response[0].nombres_cliente,
                descripcion_receta: mascota.descripcion_receta,
                dosis_receta: mascota.dosis_receta,
                nombre_mascota: mascota.nombre_mascota,
              })
            );

            this.excelSercice.exportToExcel(
              datosParaExcel,
              'Reporte Clientes',
              'Sheet1'
            );
          },
          error: () => {
            this.notificacionService.openSnackBar(
              'Error Al Generar El Reporte',
              'right',
              'top',
              2000
            );
          },
        })
        .add(() => this.loadingService.hide());
    } else {
      this.reporteGraphqlService
        .consultarReporteRecetas(Number(this.form.get('reporteMascota')?.value))
        .subscribe({
          next: (response) => {
            const datosParaExcel = response[0].recetas.map((receta) => ({
              nombre_mascota: response[0].nombre_mascota,
              edad_mascota: response[0].edad_mascota,
              raza_masctora: response[0].raza_mascota,
              peso_mascota: response[0].peso_mascota,
              medicamento: receta.medicamento,
              dosis_receta: receta.dosis_receta,
              descripcion_receta: receta.descripcion_receta,
            }));

            this.excelSercice.exportToExcel(
              datosParaExcel,
              'Reporte Recetas',
              'Sheet1'
            );
          },
          error: () => {
            this.notificacionService.openSnackBar(
              'Error Al Generar El Reporte',
              'right',
              'top',
              2000
            );
          },
        })
        .add(() => this.loadingService.hide());
    }
  }
}
