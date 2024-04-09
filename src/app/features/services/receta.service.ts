import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';
import { Receta } from '../interfaces/receta.inteface';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  constructor(private httpClient: HttpClient) {}

  consultarRecetas(): Observable<Receta[]> {
    return this.httpClient.get<Receta[]>(HttpApi.CONSULTAR_RECETAS).pipe(
      map((res: any) => {
        const data = JSON.parse(res.Message);
        return data.map((item: any) => ({
          id: item.id,
          medicamento: {
            dosis: item.dosis,
            nombre: item.medicamento,
            descripcion: item.descripcion,
          },
          mascota: {
            nombre: item.nombre_mascota,
            cedula_cliente: item.cedula_cliente,
          },
        }));
      })
    );
  }

  guardarReceta(receta: Receta): Observable<any> {
    const data = {
      id_medicamento: Number(receta.medicamento.id),
      id_mascota: Number(receta.mascota.id_mascota),
    };
    return this.httpClient.post<any>(HttpApi.GUARDAR_RECETA, data).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  eliminarReceta(receta: Receta): Observable<any> {
    const data = {
      id_receta: receta.id,
    };
    return this.httpClient.post<any>(HttpApi.ELIMINAR_RECETA, data).pipe(
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
