import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSimpleComponent } from '../../../shared/components/dialog-simple/dialog-simple.component';
import { Cliente } from '../../interfaces/cliente.interface';
import { DialogData } from '../../interfaces/dialog-data.interface';
import { Mascota } from '../../interfaces/mascota.interfa';
import { MascotaService } from '../../services/mascota.service';
import { AgregarMascotaComponent } from '../../components/mascotas/agregar-mascota/agregar-mascota.component';
import { DialogDataMascota } from '../../interfaces/dialog-data-mascota.interface';
import { ClienteService } from '../../services/cliente.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css',
})
export class MascotasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  listadoClientes: Cliente[] = [];

  filtroDescripcion = '';

  informacionMascotas: MatTableDataSource<Mascota> =
    new MatTableDataSource<Mascota>();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'edad',
    'raza',
    'peso',
    'cliente',
    'acciones',
  ];

  constructor(
    private dialog: MatDialog,
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private notificacionService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.consultarMascotas();
    this.consultarClientes();

    this.informacionMascotas.filterPredicate = (
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
    this.informacionMascotas.paginator = this.paginator;
  }

  consultarMascotas(): void {
    this.loadingService.show();
    this.mascotaService
      .consultarMascotas()
      .subscribe({
        next: (response) => {
          this.informacionMascotas.data = response;
          this.informacionMascotas.paginator = this.paginator;
        },
        error: () => {
          this.informacionMascotas.data = [];
        },
      })
      .add(() => this.loadingService.hide());
  }

  agregarMascota(): void {
    const data: DialogDataMascota = {
      title: 'Agregar Macota',
      edit: false,
      clientes: this.listadoClientes,
    };

    var _popup = this.dialog.open(AgregarMascotaComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarMascotas();
    });
  }

  editarMascota(mascotaSeleccionada: Mascota): void {
    const data: DialogDataMascota = {
      title: 'Editar Macota',
      edit: true,
      data: mascotaSeleccionada,
      clientes: this.listadoClientes,
    };

    var _popup = this.dialog.open(AgregarMascotaComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarMascotas();
    });
  }

  eliminarMascota(mascotaSeleccionada: Mascota): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar la mascota ${mascotaSeleccionada.nombre}  con Id: ${mascotaSeleccionada.id_mascota}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.loadingService.show();
        this.mascotaService
          .eliminarMascota(mascotaSeleccionada)
          .subscribe({
            next: () => {
              this.notificacionService.openSnackBar(
                'Mascota Eliminada ',
                'right',
                'top',
                2000
              );
              this.consultarMascotas();
            },
            error: () => {
              this.notificacionService.openSnackBar(
                'Error Al Eliminar La Mascota',
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

  consultarClientes(): void {
    this.clienteService.consultarClientes().subscribe({
      next: (response) => {
        this.listadoClientes = response;
      },
      error: () => {},
    });
  }

  aplicarFiltros(): void {
    this.informacionMascotas.filter = JSON.stringify({
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
