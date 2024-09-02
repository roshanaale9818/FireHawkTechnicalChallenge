import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarlistComponent } from './components/carlist/carlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarFormComponent } from './components/car-form/car-form.component';

@NgModule({
  declarations: [CarlistComponent, CarFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarRoutingModule,
    CarFormComponent,
  ],
  exports: [CarFilterComponent],
})
export class CarModule {}
