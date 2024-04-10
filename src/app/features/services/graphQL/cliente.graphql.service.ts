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
  constructor(private apollo: Apollo) {}

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
        map((result) => result.data.clients as Cliente[]),
        catchError((error) => {
          console.error('Error al consultar clientes:', error);
          return throwError(
            'Error al consultar clientes. Por favor, inténtelo de nuevo más tarde.'
          );
        })
      );
  }

  guardarCliente(cliente: Cliente): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation createClient(
          $cedula: String!
          $nombres: String!
          $apellidos: String!
          $direccion: String!
          $telefono: String!
          $correo: String!
        ) {
          createClient(
            input: {
              cedula: $cedula
              nombres: $nombres
              apellidos: $apellidos
              direccion: $direccion
              telefono: $telefono
              correo: $correo
            }
          ) {
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
        cedula: cliente.cedula,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo,
      },
    });
  }

  editarCliente(cliente: Cliente): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation updateClient(
          $cedula: String!
          $nombres: String!
          $apellidos: String!
          $direccion: String!
          $telefono: String!
          $correo: String!
        ) {
          updateClient(
            input: {
              cedula: $cedula
              nombres: $nombres
              apellidos: $apellidos
              direccion: $direccion
              telefono: $telefono
              correo: $correo
            }
          ) {
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
        cedula: cliente.cedula,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo,
      },
    });
  }

  eliminarCliente(cedula: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation deleteClient($cedula: String!) {
          deleteClient(cedula: $cedula)
        }
      `,
      variables: {
        cedula: cedula,
      },
    });
  }
}
