import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';
import { ReporteMascotaPorCliente } from '../interfaces/reporte-mascotas-por-cliente.interface';
import { ReporteRecetas } from '../interfaces/reporte-recetas-por-mascota.interface';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private httpClient: HttpClient) { }

  consultarReporteClientes(cliente: string): Observable<ReporteMascotaPorCliente[]> {
    const data = {
      cedula_cliente: cliente
    };

    return this.httpClient.post<any[]>(HttpApi.CONSULTA_REPORTE_CLIENTE, data).pipe(
      map((res: any) => {
        const parsedData = JSON.parse(res.Message) as ReporteMascotaPorCliente[];
        return parsedData;
      })
    );
  }


  consultarReporteRecetas(idMascota: number): Observable<ReporteRecetas[]> {
    const data = {
      id_mascota: idMascota
    }
    return this.httpClient.post<ReporteRecetas[]>(HttpApi.CONSULTA_REPORTE_RECETAS, data).pipe(
      map((res: any) => {
        const parsedData = JSON.parse(res.Message) as ReporteRecetas[];
        return parsedData;
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
