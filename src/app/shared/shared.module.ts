import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { NaPipe } from './pipes/na.pipe';

@NgModule({
  declarations: [CapitalizePipe, NaPipe],
  imports: [CommonModule],
  exports: [CapitalizePipe, NaPipe],
})
export class SharedModule {}
