import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarlistComponent } from './components/carlist/carlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CarlistComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CarRoutingModule],
})
export class CarModule {}
