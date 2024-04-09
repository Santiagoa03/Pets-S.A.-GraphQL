import { Cliente } from './../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private httpClient: HttpClient) { }


  consultarClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(HttpApi.CONSULTAR_CLIENTES).pipe(
      map((res: any) => {
        const data = JSON.parse(res.Message);
        return data.map((item: any) => ({
          cedula: item.cedula,
          nombres: item.nombres,
          apellidos: item.apellidos,
          direccion: item.direccion,
          telefono: item.telefono,
          correo: item.correo
        }));
      })
    );
  }

  guardarCliente(cliente: Cliente): Observable<any> {
    return this.httpClient.post<any>(HttpApi.GUARDAR_CLIENTE, cliente).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  editarCliente(cliente: Cliente): Observable<any> {
    return this.httpClient.post<any>(HttpApi.EDITAR_CLIENTE, cliente).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  eliminarCliente(id: string): Observable<any> {
    const data = {
      cedula: id
    }
    return this.httpClient.post<any>(HttpApi.ELIMINAR_CLIENTE, data).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  validarMensajeError(res: unknown) {
    const error = res as IRespuesta;
    if (error.error) {
      //this.utilService.mostrarMensaje(error.descripcionRespuesta, 'warning');
      throw new Error(error.descripcionRespuesta);
    }
  }
}
