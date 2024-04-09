import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { MedicamentosComponent } from './pages/medicamentos/medicamentos.component';
import { HomeComponent } from './pages/home/home.component';
import { RecetasComponent } from './pages/recetas/recetas.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'mascotas',
    component: MascotasComponent,
  },
  {
    path: 'medicamentos',
    component: MedicamentosComponent,
  },
  {
    path: 'recetas',
    component: RecetasComponent,
  },
  {
    path: 'reportes',
    component: ReportesComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
