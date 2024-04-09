import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';
import { Medicamento } from '../interfaces/medicamento.inteface';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  constructor(private httpClient: HttpClient) { }

  consultarMedicamento(): Observable<Medicamento[]> {
    return this.httpClient.get<Medicamento[]>(HttpApi.CONSULTAR_MEDICAMENTO).pipe(
      map((res: any) => {
        const data = JSON.parse(res.Message);
        return data.map((item: any) => ({
          id: item.id,
          dosis: item.dosis,
          nombre: item.nombre,
          descripcion: item.descripcion,
        }));
      })
    );
  }

  guardarMedicamento(medicamento: Medicamento): Observable<any> {
    return this.httpClient.post<any>(HttpApi.GUARDAR_MEDICAMENTO, medicamento).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  editarMedicamento(medicamento: Medicamento): Observable<any> {

    const data = {
      id_medicamento: medicamento.id,
      nombre: medicamento.nombre,
      descripcion: medicamento.descripcion,
      dosis: medicamento.dosis
    };

    return this.httpClient.post<any>(HttpApi.EDITAR_MEDICAMENTO, data).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  eliminarMedicamento(medicamento: Medicamento): Observable<any> {

    const data = {
      id_medicine: medicamento.id
    }
    return this.httpClient.post<any>(HttpApi.ELIMINAR_MEDICAMENTO, data).pipe(
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
