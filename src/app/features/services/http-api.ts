export class HttpApi {
  static readonly SOLICITUD_BASE_CLIENTES = 'clients';
  static readonly SOLICITUD_BASE_MASCOTAS = 'pets';
  static readonly SOLICITUD_BASE_MEDICAMENTOS = 'medicines';
  static readonly SOLICITUD_BASE_RECETAS = 'recipes';
  static readonly SOLICITUD_BASE_REPORTES = 'reports';

  /*Clientes */
  static readonly CONSULTAR_CLIENTES = `${this.SOLICITUD_BASE_CLIENTES}/get-clients/`;
  static readonly GUARDAR_CLIENTE = `${this.SOLICITUD_BASE_CLIENTES}/insert-client/`;
  static readonly EDITAR_CLIENTE = `${this.SOLICITUD_BASE_CLIENTES}/update-client/`;
  static readonly ELIMINAR_CLIENTE = `${this.SOLICITUD_BASE_CLIENTES}/delete-client/`;

  /*Mascotas */
  static readonly CONSULTAR_MASCOTAS = `${this.SOLICITUD_BASE_MASCOTAS}/get-pets/`;
  static readonly GUARDAR_MASCOTA = `${this.SOLICITUD_BASE_MASCOTAS}/insert-pet/`;
  static readonly EDITAR_MASCOTA = `${this.SOLICITUD_BASE_MASCOTAS}/update-pet/`;
  static readonly ELIMINAR_MASCOTA = `${this.SOLICITUD_BASE_MASCOTAS}/delete-pet/`;

  /*Medicamento */
  static readonly CONSULTAR_MEDICAMENTO = `${this.SOLICITUD_BASE_MEDICAMENTOS}/get-medicines/`;
  static readonly GUARDAR_MEDICAMENTO = `${this.SOLICITUD_BASE_MEDICAMENTOS}/insert-medicine/`;
  static readonly EDITAR_MEDICAMENTO = `${this.SOLICITUD_BASE_MEDICAMENTOS}/update-medicine/`;
  static readonly ELIMINAR_MEDICAMENTO = `${this.SOLICITUD_BASE_MEDICAMENTOS}/delete-medicine/`;

  /*Recetas */
  static readonly CONSULTAR_RECETAS = `${this.SOLICITUD_BASE_RECETAS}/get-recipes/`;
  static readonly GUARDAR_RECETA = `${this.SOLICITUD_BASE_RECETAS}/insert-recipe/`;
  static readonly ELIMINAR_RECETA = `${this.SOLICITUD_BASE_RECETAS}/delete-recipe/`;

  /*Reportes */
  static readonly CONSULTA_REPORTE_CLIENTE = `${this.SOLICITUD_BASE_REPORTES}/client-report/`;
  static readonly CONSULTA_REPORTE_RECETAS = `${this.SOLICITUD_BASE_REPORTES}/pet-report/`;
}
