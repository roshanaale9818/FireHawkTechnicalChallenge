import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ModalService } from '../../../core/services/modal.service';
import { Car } from '../../../shared/model/car.model';
import { CustomResponse } from '../../../shared/model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
})
export class CarlistComponent {
  cars: Car[] = [];
  searchedCarName: string = '';
  filter: any = {};
  public showAdvancedFilters: boolean = false;
  addCarForm: FormGroup;
  cylinders: number[] = [4, 6, 8];
  modelYears: number[] = [2020, 2021, 2022, 2023, 2024];
  origins: string[] = ['USA', 'Europe', 'Asia'];
  constructor(
    private carService: CarService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    this.addCarForm = this.fb.group({
      id: [''],
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

  ngOnInit(): void {
    this.loadCars();
  }
  addNewCar() {
    this.addCarForm.reset();
    this.showDialog();
  }
  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }
  loadCars(): void {
    this.carService.getCarList('').subscribe((res: CustomResponse) => {
      if (res.status == 'ok') {
        this.cars = res.data;
      } else {
        this.cars = [];
      }
    });
  }

  search(): void {
    // Implement search logic here
    // For example: this.cars = this.cars.filter(car => car.name.includes(this.searchQuery));
  }

  showDialog(): void {
    this.modalService.showModal('sss');
  }
  trackByCarId(index: number, car: Car): string {
    return car.id; // or any unique identifier
  }

  editCar(car: Car): void {
    this.addCarForm.patchValue({
      id: car.id,
      name: car.name,
      mpg: car.mpg,
      cylinders: car.cylinders,
      displacement: car.displacement,
      horsepower: car.horsepower,
      weight: car.weight,
      acceleration: car.acceleration,
      modelYear: car.modelYear,
      origin: car.origin,
    });
    this.showDialog();
  }

  deleteCar(car: Car): void {
    if (confirm(`Are you sure you want to delete ${car.name}?`)) {
      this.carService.deleteCar(car).subscribe((res: CustomResponse) => {
        console.log(res);
        if (res.status == 'ok') {
          this.loadCars();
          alert('Car deleted successfull.');
        }
      });
    }
  }
  onFilterChanged(event: any) {
    console.log(event);
  }
  onCloseDialog() {
    this.modalService.hideModal();
  }

  onSubmit(): void {
    console.log(this.addCarForm.value);
    if (!this.addCarForm.valid) {
      return;
    } else {
      const newCar = this.addCarForm.value;
      console.log('Car new', newCar);
      if (newCar.id) {
        this.carService.updateCar(newCar).subscribe((res: CustomResponse) => {
          if (res.status == 'ok') {
            this.onCloseDialog();
            alert('Data updated successfull.');
            this.loadCars();
          } else {
            alert('Data failed to save. Please try again later.');
          }
        });
      } else {
        this.carService.addCar(newCar).subscribe((res: CustomResponse) => {
          if (res.status == 'ok') {
            this.onCloseDialog();
            alert('Data saved successfull.');
            this.loadCars();
          } else {
            alert('Data failed to save. Please try again later.');
          }
        });
      }

      // this.onCloseDialog();
    }
  }
}
