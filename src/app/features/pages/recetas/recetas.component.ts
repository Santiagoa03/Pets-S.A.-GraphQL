import { MascotaGraphqlService } from './../../services/graphQL/mascota.graphql.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Receta } from '../../interfaces/receta.inteface';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSimpleComponent } from '../../../shared/components/dialog-simple/dialog-simple.component';
import { DialogData } from '../../interfaces/dialog-data.interface';
import { DialogDataReceta } from '../../interfaces/dialog-data-receta.interface';
import { AgregarRecetaComponent } from '../../components/recetas/agregar-receta/agregar-receta.component';
import { MedicamentoService } from '../../services/medicamento.service';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../interfaces/mascota.interfa';
import { Medicamento } from '../../interfaces/medicamento.inteface';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { RecetaGraphqlService } from '../../services/graphQL/receta.graphql.service';
import { MedicamentoGraphqlService } from '../../services/graphQL/medicamento.graphql.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css',
})
export class RecetasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  listMascotas: Mascota[];
  listMedicamentos: Medicamento[];

  filtroDescripcion = '';
  filtroNombreMascota = '';

  informacionRecetas: MatTableDataSource<Receta> =
    new MatTableDataSource<Receta>();

  displayedColumns: string[] = ['id', 'medicamento', 'mascota', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private recetaGraphqlService: RecetaGraphqlService,
    private medicamentoGraphqlService: MedicamentoGraphqlService,
    private mascotaGraphqlService: MascotaGraphqlService,
    private notificacionService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.consultarRecetas();
    this.consultarMascotas();
    this.consultarMedicamentos();

    this.informacionRecetas.filterPredicate = (
      data,
      filter: string
    ): boolean => {
      const filters = JSON.parse(filter);

      const matchDescripcion = data.medicamento.nombre
        .toLowerCase()
        .includes(filters.descripcion);

      const mathNombreMascota = data.mascota.nombre
        .toLowerCase()
        .includes(filters.nombreMascota);

      return matchDescripcion && mathNombreMascota;
    };
  }

  ngAfterViewInit(): void {
    this.informacionRecetas.paginator = this.paginator;
  }

  consultarRecetas(): void {
    this.loadingService.show();
    this.recetaGraphqlService
      .consultarRecetas()
      .subscribe({
        next: (response) => {
          this.informacionRecetas.data = response;
          this.informacionRecetas.paginator = this.paginator;
        },
        error: () => {
          this.informacionRecetas.data = [];
        },
      })
      .add(() => this.loadingService.hide());
  }

  agregarReceta(): void {
    const data: DialogDataReceta = {
      title: 'Agregar Receta',
      edit: false,
      mascotas: this.listMascotas,
      medicamentos: this.listMedicamentos,
    };

    var _popup = this.dialog.open(AgregarRecetaComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe((item) => {
      this.consultarRecetas();
    });
  }

  eliminarReceta(recetaSeleccionada: Receta): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar la receta con Id: ${recetaSeleccionada.id}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.loadingService.show();
        this.recetaGraphqlService
          .eliminarReceta(recetaSeleccionada?.id ?? 0)
          .subscribe({
            next: () => {
              this.notificacionService.openSnackBar(
                'Receta Eliminada',
                'right',
                'top',
                2000
              );
              this.consultarRecetas();
            },
            error: () => {
              this.notificacionService.openSnackBar(
                'Error Al Eliminar Receta',
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

  consultarMascotas(): void {
    this.mascotaGraphqlService.consultarMascotas().subscribe({
      next: (response) => {
        this.listMascotas = response;
      },
      error: () => {},
    });
  }

  consultarMedicamentos(): void {
    this.medicamentoGraphqlService.consultarMedicamento().subscribe({
      next: (response) => {
        this.listMedicamentos = response;
      },
      error: () => {},
    });
  }

  aplicarFiltros(): void {
    this.informacionRecetas.filter = JSON.stringify({
      descripcion: this.filtroDescripcion.toLowerCase(),
      nombreMascota: this.filtroNombreMascota.toLowerCase(),
    });
  }
}
