import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from '../shared/components/modal/modal.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ModalComponent],
})
export class HomeModule {}
