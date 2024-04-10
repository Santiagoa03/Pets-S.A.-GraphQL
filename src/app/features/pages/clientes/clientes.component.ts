import { DialogData } from './../../interfaces/dialog-data.interface';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../interfaces/cliente.interface';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgregarClienteComponent } from '../../components/clientes/agregar-cliente/agregar-cliente.component';
import { DialogSimpleComponent } from '../../../shared/components/dialog-simple/dialog-simple.component';
import { DialogDataCliente } from '../../interfaces/dialog-data-cliente.interface';

import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ClienteGraphqlService } from '../../services/graphQL/cliente.graphql.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  filtroNroDocumento = '';
  filtroDescripcion = '';

  informacionClientes: MatTableDataSource<Cliente> =
    new MatTableDataSource<Cliente>();

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'telefono',
    'correo',
    'direccion',
    'acciones',
  ];

  constructor(
    private clienteGraphql: ClienteGraphqlService,
    private dialog: MatDialog,
    private notificacionService: NotificationService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.consultarClientes();

    this.informacionClientes.filterPredicate = (
      data,
      filter: string
    ): boolean => {
      const filters = JSON.parse(filter);
      const matchNroDocumento = data.cedula
        .toString()
        .toLowerCase()
        .includes(filters.nroDocumento);
      const matchDescripcion = data.nombres
        .toLowerCase()
        .includes(filters.descripcion);
      return matchNroDocumento && matchDescripcion;
    };
  }

  ngAfterViewInit(): void {
    this.informacionClientes.paginator = this.paginator;
  }

  consultarClientes(): void {

    this.clienteGraphql.consultarClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.informacionClientes.data = clientes;
      },
      error: (error) => {
        console.error('Error al consultar clientes:', error);
      },
    });
  }

  agregarCliente(): void {
    const data: DialogData = {
      title: 'Agregar Cliente',
      edit: false,
    };

    var _popup = this.dialog.open(AgregarClienteComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarClientes();
    });
  }

  editarCliente(clienteSeleccionado: Cliente): void {
    const data: DialogDataCliente = {
      title: 'Editar Cliente',
      edit: true,
      data: clienteSeleccionado,
    };

    var _popup = this.dialog.open(AgregarClienteComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarClientes();
    });
  }

  eliminarCliente(clienteSeleccionado: Cliente): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar el cliente ${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos}  con Cédula: ${clienteSeleccionado.cedula}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.loadingService.show();
        this.clienteGraphql
          .eliminarCliente(clienteSeleccionado.cedula)
          .subscribe({
            next: () => {
              this.notificacionService.openSnackBar(
                'Cliente Eliminado',
                'right',
                'top',
                2000
              );
              this.consultarClientes();
            },
            error: () => {
              this.notificacionService.openSnackBar(
                'Error Al Eliminar El Cliente',
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
    this.informacionClientes.filter = JSON.stringify({
      nroDocumento: this.filtroNroDocumento.toLowerCase(),
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
