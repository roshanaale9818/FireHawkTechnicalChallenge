import { Component } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../car/services/car.service';
import { CustomResponse } from '../../../shared/model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  addCarForm: FormGroup;
  cylinders: number[] = [4, 6, 8];
  modelYears: number[] = [2020, 2021, 2022, 2023, 2024];
  origins: string[] = ['USA', 'Europe', 'Asia'];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private carService: CarService
  ) {
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
      this.carService.addCar(newCar).subscribe((data: CustomResponse) => {
        if (data.status == 'ok') {
          alert('Car added successfull.');
        } else {
          alert('Saving failed. Please try again later.');
        }
      });
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
