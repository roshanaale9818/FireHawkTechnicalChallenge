import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
})
export class CarlistComponent {
  cars: any[] = [];
  searchQuery: string = '';
  filter: any = {};

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
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
    // Implement add car logic, e.g., open a modal or navigate to a form page
  }

  editCar(id: string): void {
    // Implement edit car logic
  }

  deleteCar(id: string): void {
    // this.carService.deleteCar(id).then(() => {
    //   this.loadCars(); // Reload the list after deletion
    // });
  }
}
