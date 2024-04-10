import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../../interfaces/cliente.interface';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class ClienteGraphqlService {
  constructor(private apollo: Apollo) { }

  consultarClientes(): Observable<Cliente[]> {
    return this.apollo
      .query<any>({
        query: gql`
            query clients {
              clients {
                cedula
                nombres
                apellidos
                direccion
                telefono
                correo
              }
            }
          `,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map(result => result.data.clients as Cliente[]),
        catchError((error) => {
          console.error('Error al consultar clientes:', error);
          return throwError('Error al consultar clientes. Por favor, inténtelo de nuevo más tarde.');
        })
      );
  }

  guardarCliente(cliente: Cliente): Observable<any> {
    return this.apollo.mutate<any>({
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
        input: cliente,
      },
    });
  }

  editarCliente(cliente: Cliente): Observable<any> {
    return this.apollo.mutate<any>({
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
        input: cliente,
      },
    });
  }

  eliminarCliente(id: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation eliminarCliente($id: String!) {
          eliminarCliente(id: $id)
        }
      `,
      variables: {
        id: id,
      },
    });
  }
}
