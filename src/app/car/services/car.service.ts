import { HttpClient, HttpParams } from '@angular/common/http';
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
    let httpParams = new HttpParams();

    // Add each parameter to the HttpParams object if it exists
    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    // Make the GET request with the query parameters
    return this.http.get('http://localhost:8080/car', { params: httpParams });
  }
  deleteCar(car: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/car/${car.id}`);
  }
  updateCar(car: Car): Observable<any> {
    return this.http.put(`http://localhost:8080/car/${car.id}`, car);
  }

  uploadCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`http://localhost:8080/upload-csv`, formData);
  }
}
