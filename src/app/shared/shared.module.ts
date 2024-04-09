import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSimpleComponent } from './components/dialog-simple/dialog-simple.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MenuComponent, DialogSimpleComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
  ],
  exports: [MenuComponent, DialogSimpleComponent],
})
export class SharedModule {}
