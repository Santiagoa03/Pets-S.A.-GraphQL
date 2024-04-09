import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      icon: 'home',
      label: 'Inicio',
      route: '',
    },
    {
      icon: 'group',
      label: 'Clientes',
      route: 'clinica-pet/clientes',
    },
    {
      icon: 'pets',
      label: 'Mascotas',
      route: 'clinica-pet/mascotas',
    },
    {
      icon: 'medication',
      label: 'Medicinas',
      route: 'clinica-pet/medicamentos',
    },
    {
      icon: 'description',
      label: 'Recetas',
      route: 'clinica-pet/recetas',
    },
    {
      icon: 'file_copy',
      label: 'Reportes',
      route: 'clinica-pet/reportes',
    },
  ];
}
