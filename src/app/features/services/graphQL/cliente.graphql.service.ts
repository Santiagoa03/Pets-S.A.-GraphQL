import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteGraphqlService {
  constructor(private apollo: Apollo) {}

  consultarClientes(): Observable<Cliente[]> {
    return this.apollo
      .query<any>({
        query: gql`
          query {
            clientes {
              cedula
              nombres
              apellidos
              direccion
              telefono
              correo
            }
          }
        `,
      })
      .pipe(
        map((res) => res.data.clientes)
      );
  }

  guardarCliente(cliente: Cliente): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation guardarCliente($input: ClienteInput!) {
            guardarCliente(input: $input) {
              cedula
              nombres
              apellidos
              direccion
              telefono
              correo
            }
          }
        `,
        variables: {
          input: cliente
        }
      });
  }

  editarCliente(cliente: Cliente): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation editarCliente($input: ClienteInput!) {
            editarCliente(input: $input) {
              cedula
              nombres
              apellidos
              direccion
              telefono
              correo
            }
          }
        `,
        variables: {
          input: cliente
        }
      });
  }

  eliminarCliente(id: string): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation eliminarCliente($id: String!) {
            eliminarCliente(id: $id)
          }
        `,
        variables: {
          id: id
        }
      });
  }
}
