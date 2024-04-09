import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './services/cliente.service';
import { MatInputModule } from '@angular/material/input';
import { AgregarClienteComponent } from './components/clientes/agregar-cliente/agregar-cliente.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { MascotaService } from './services/mascota.service';
import { AgregarMascotaComponent } from './components/mascotas/agregar-mascota/agregar-mascota.component';
import { MedicamentoService } from './services/medicamento.service';
import { MedicamentosComponent } from './pages/medicamentos/medicamentos.component';
import { AgregarMedicamentoComponent } from './components/medicamentos/agregar-medicamento/agregar-medicamento.component';
import { RecetasComponent } from './pages/recetas/recetas.component';
import { RecetaService } from './services/receta.service';
import { AgregarRecetaComponent } from './components/recetas/agregar-receta/agregar-receta.component';
import { MatSelectModule } from '@angular/material/select';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ReporteService } from './services/reporte.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

@NgModule({
  declarations: [
    HomeComponent,
    ClientesComponent,
    AgregarClienteComponent,
    MascotasComponent,
    AgregarMascotaComponent,
    MedicamentosComponent,
    AgregarMedicamentoComponent,
    RecetasComponent,
    AgregarRecetaComponent,
    ReportesComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    SharedModule,
    MatSnackBarModule,
    ApolloModule,
    
  ],
  providers: [
    ClienteService,
    MascotaService,
    MedicamentoService,
    RecetaService,
    ReporteService,
  ],
})
export class FeaturesModule {}
