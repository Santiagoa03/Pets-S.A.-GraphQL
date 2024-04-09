import { Cliente } from './../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';
import { Mascota } from '../interfaces/mascota.interfa';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  constructor(private httpClient: HttpClient) { }

  consultarMascotas(): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(HttpApi.CONSULTAR_MASCOTAS).pipe(
      map((res: any) => {
        const data = JSON.parse(res.Message);
        return data.map((item: any) => ({
          id_mascota: item.id,
          edad: item.edad,
          peso: item.peso,
          raza: item.raza,
          nombre: item.nombre,
          cedula_cliente: {
            correo: item.correo_cliente,
            telefono: item.telefono_cliente,
            nombre: item.nombre_cliente,
            cedula: item.cedula_cliente,
            apellidos: item.apellidos_cliente,
            direccion: item.direccion_cliente
          }
        }));
      })
    );
  }

  guardarMascota(mascota: Mascota): Observable<any> {
    return this.httpClient.post<any>(HttpApi.GUARDAR_MASCOTA, mascota).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  editarMascota(mascota: Mascota): Observable<any> {
    return this.httpClient.post<any>(HttpApi.EDITAR_MASCOTA, mascota).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  eliminarMascota(mascota: Mascota): Observable<any> {
    const data = {
      id_mascota: mascota.id_mascota
    }
    return this.httpClient.post<any>(HttpApi.ELIMINAR_MASCOTA, data).pipe(
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
