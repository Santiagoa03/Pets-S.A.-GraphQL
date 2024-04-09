import { Component, OnInit, ViewChild } from '@angular/core';
import { Medicamento } from '../../interfaces/medicamento.inteface';
import { MedicamentoService } from '../../services/medicamento.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSimpleComponent } from '../../../shared/components/dialog-simple/dialog-simple.component';
import { DialogData } from '../../interfaces/dialog-data.interface';
import { AgregarMedicamentoComponent } from '../../components/medicamentos/agregar-medicamento/agregar-medicamento.component';
import { DialogDataMedicamento } from '../../interfaces/dialog-data-medicamento.interface';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.css',
})
export class MedicamentosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  filtroId = '';
  filtroDescripcion = '';

  informacionMedicamentos: MatTableDataSource<Medicamento> =
    new MatTableDataSource<Medicamento>();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'dosis',
    'descripcion',
    'acciones',
  ];

  constructor(
    private dialog: MatDialog,
    private medicamentoService: MedicamentoService,
    private notificacionService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.consultarMedicamentos();

    this.informacionMedicamentos.filterPredicate = (
      data,
      filter: string
    ): boolean => {
      const filters = JSON.parse(filter);
      const matchDescripcion = data.nombre
        .toLowerCase()
        .includes(filters.descripcion);
      return matchDescripcion;
    };
  }

  ngAfterViewInit(): void {
    this.informacionMedicamentos.paginator = this.paginator;
  }

  consultarMedicamentos(): void {
    this.loadingService.show();
    this.medicamentoService
      .consultarMedicamento()
      .subscribe({
        next: (response) => {
          this.informacionMedicamentos.data = response;
          this.informacionMedicamentos.paginator = this.paginator;
        },
        error: () => {
          this.informacionMedicamentos.data = [];
        },
      })
      .add(() => this.loadingService.hide());
  }

  agregarMedicamento(): void {
    const data: DialogData = {
      title: 'Agregar Medicamento',
      edit: false,
    };

    var _popup = this.dialog.open(AgregarMedicamentoComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe((item) => {
      this.consultarMedicamentos();
    });
  }

  editarMedicamento(medicamentoSeleccionado: Medicamento): void {
    const data: DialogDataMedicamento = {
      title: 'Editar Medicamento',
      edit: true,
      data: medicamentoSeleccionado,
    };

    var _popup = this.dialog.open(AgregarMedicamentoComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarMedicamentos();
    });
  }

  eliminarMedicamento(medicamentoSeleccionado: Medicamento): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar el medicamento ${medicamentoSeleccionado.nombre}  con Id: ${medicamentoSeleccionado.id}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.loadingService.show();
        this.medicamentoService
          .eliminarMedicamento(medicamentoSeleccionado)
          .subscribe({
            next: () => {
              this.notificacionService.openSnackBar(
                'Medicamento Eliminado',
                'right',
                'top',
                2000
              );
              this.consultarMedicamentos();
            },
            error: () => {
              this.notificacionService.openSnackBar(
                'Error Al Eliminar El Medicamento',
                'right',
                'top',
                2000
              );
            },
          })
          .add(() => this.loadingService.hide());
      }
    });
  }

  aplicarFiltros(): void {
    this.informacionMedicamentos.filter = JSON.stringify({
      nroDocumento: this.filtroId.toLowerCase(),
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
