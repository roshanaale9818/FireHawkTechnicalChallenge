import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../core/services/modal.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css',
})
export class CarFormComponent {
  addCarForm: FormGroup;
  cylinders: number[] = [4, 6, 8];
  modelYears: number[] = [2020, 2021, 2022, 2023, 2024];
  origins: string[] = ['USA', 'Europe', 'Asia'];

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.addCarForm = this.fb.group({
      name: ['', Validators.required],
      mpg: [null, [Validators.required, Validators.min(0)]],
      cylinders: [null, Validators.required],
      displacement: [null, [Validators.required, Validators.min(0)]],
      horsepower: [null, [Validators.required, Validators.min(0)]],
      weight: [null, [Validators.required, Validators.min(0)]],
      acceleration: [null, [Validators.required, Validators.min(0)]],
      modelYear: [null, Validators.required],
      origin: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.addCarForm.valid) {
      return;
    } else {
      const newCar = this.addCarForm.value;
      console.log('New Car Data:', newCar);
      this.onCloseDialog();
    }
  }
  onShowModal() {
    this.modalService.showModal('');
    console.log(this.modalService.showModal('sdsdsdsdds'));
  }
  onCloseDialog() {
    this.modalService.hideModal();
  }
}
