import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../shared/model/car.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}
  addCar(car: Car): Observable<any> {
    return this.http.post('http://localhost:8080/car', car);
  }
  getCarList(params: any): Observable<any> {
    return this.http.get('http://localhost:8080/car');
  }
  deleteCar(car: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/car/${car.id}`);
  }
  updateCar(car: Car): Observable<any> {
    return this.http.put(`http://localhost:8080/car/${car.id}`, car);
  }
}
