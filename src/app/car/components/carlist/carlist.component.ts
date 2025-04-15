import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ModalService } from '../../../core/services/modal.service';
import { Car } from '../../../shared/model/car.model';
import { CustomResponse } from '../../../shared/model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environments } from '../../../environments/environment.prod';
import { LoadingService } from '../../../shared/loading.service';
import { CarFilterComponent } from '../car-filter/car-filter.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
})
export class CarlistComponent {
  apiUrl = environments.apiUrl;
  cars: Car[] = [];
  searchedCarName: string = '';
  filter: any = {};
  public showAdvancedFilters: boolean = false;
  addCarForm: FormGroup;
  cylinders: number[] = [4, 6, 8];
  modelYears: number[] = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  origins: string[] = ['usa', 'europe', 'asia', 'japan'];
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(
    private carService: CarService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private toast: ToastrService
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
  isLoading: boolean = true;
  loadCars(): void {
    this.isLoading = true;
    const savedFilters = localStorage.getItem('searchFilters');
    let searchParams;
    let filter;
    if (savedFilters) {
      filter = JSON.parse(savedFilters);
    }
    const carName = localStorage.getItem('carName');
    this.searchedCarName = carName ? JSON.parse(carName) : '';
    searchParams = {
      ...filter,
      carName: carName ? JSON.parse(carName) : '',
    };
    this.loadingService.show('Loading data...');

    this.carService.getCarList(searchParams).subscribe(
      (res: CustomResponse) => {
        if (res.status == 'ok') {
          this.loadingService.hide();
          this.cars = res.data;
        } else {
          this.cars = [];
        }

        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.loadingService.hide();
        this.toast.error(err.error.message);
      }
    );
  }

  search(): void {
    localStorage.setItem('carName', JSON.stringify(this.searchedCarName));
  }

  showDialog(): void {
    this.modalService.showModal('show');
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
      this.carService.deleteCar(car).subscribe(
        (res: CustomResponse) => {
          if (res.status == 'ok') {
            this.loadCars();
            this.toast.success('Car deleted successfull.');
          }
        },
        (err) => {
          console.log(err);
          this.loadingService.hide();
          this.toast.error(err.error.message);
        }
      );
    }
  }
  onFilterChanged(event: any) {
    this.loadCars();
  }
  onCloseDialog() {
    this.modalService.hideModal();
  }
  isLoadingForm: boolean = false;
  onSubmit(): void {
    if (!this.addCarForm.valid) {
      return;
    } else {
      this.isLoadingForm = true;
      const newCar = this.addCarForm.value;
      if (newCar.id) {
        this.carService.updateCar(newCar).subscribe(
          (res: CustomResponse) => {
            this.isLoadingForm = false;
            if (res.status == 'ok') {
              this.onCloseDialog();
              this.toast.success('Data updated successfull.');
              this.loadCars();
            } else {
              this.toast.error('Data failed to save. Please try again later.');
            }
          },
          (err) => {
            console.log(err);
            this.loadingService.hide();
            this.toast.error(err.error.message);
          }
        );
      } else {
        this.carService.addCar(newCar).subscribe(
          (res: CustomResponse) => {
            this.isLoadingForm = false;
            if (res.status == 'ok') {
              this.onCloseDialog();
              this.toast.success('Data saved successfull.');
              this.loadCars();
            } else {
              this.toast.error('Data failed to save. Please try again later.');
            }
          },
          (err) => {
            console.log(err);
            this.loadingService.hide();
            this.toast.error(err.error.message);
          }
        );
      }

      // this.onCloseDialog();
    }
  }
  selectedFileName: string = '';
  selectedFile: any = null;
  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    if (file) {
      if (file.type !== 'text/csv') {
        this.toast.error('Invalid file format.');
        this.selectedFile = null;
        this.selectedFileName = '';
        return;
      }
      this.selectedFileName = file.name;
      this.selectedFile = file;
    }
  }
  selectCSV() {
    this.fileInput?.nativeElement.click();
  }
  isUploading: boolean = false;
  onUploadCSV() {
    if (this.isUploading) return;
    this.isUploading = true;
    this.loadingService.show('Uploading... This may take few moments');
    this.carService.uploadCsv(this.selectedFile).subscribe(
      (res: CustomResponse) => {
        if (res.status == 'ok') {
          this.loadingService.hide();
          this.toast.success('Data uploaded successfull.');
          this.loadCars();
          this.selectedFile = null;
          this.selectedFileName = '';
          this.isUploading = false;
        }
      },
      (err) => {
        console.log(err);
        this.loadingService.hide();
        this.toast.error(err.error.message);
      }
    );
  }

  downloadCSV() {
    try {
      this.loadingService.show('Downloading...');
      this.carService.downloadCsv().subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'cars.csv';
          link.click();
          window.URL.revokeObjectURL(url);
          this.loadingService.hide();
          // alert('Download successfull.');
        },
        (err) => {
          console.log(err);
          this.loadingService.hide();
          this.toast.error(err.error.message);
        }
      );
    } catch (er) {
      alert('Something went wrong. Please try again later.');
      console.error(er);
    }
  }
  onSearch() {
    if (!this.searchedCarName) return;
    this.loadCars();
  }
}
