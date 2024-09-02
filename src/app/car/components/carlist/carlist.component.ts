import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
})
export class CarlistComponent {
  cars: any[] = [];
  searchedCarName: string = '';
  filter: any = {};
  public showAdvancedFilters: boolean = false;

  constructor(
    private carService: CarService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }
  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }
  loadCars(): void {
    // this.carService.getCars().subscribe(cars => {
    //   this.cars = cars;
    // });
  }

  search(): void {
    // Implement search logic here
    // For example: this.cars = this.cars.filter(car => car.name.includes(this.searchQuery));
  }

  addCar(): void {
    this.modalService.showModal('');
  }

  editCar(id: string): void {
    // Implement edit car logic
  }

  deleteCar(id: string): void {
    // this.carService.deleteCar(id).then(() => {
    //   this.loadCars(); // Reload the list after deletion
    // });
  }
  onFilterChanged(event: any) {
    console.log(event);
  }
}
