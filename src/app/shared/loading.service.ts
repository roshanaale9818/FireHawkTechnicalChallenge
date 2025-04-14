import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();
  private messageSubject = new BehaviorSubject<string>('Loading...');
  message$ = this.messageSubject.asObservable();
  show(message: string = 'Loading...') {
    this._loading.next(true);
    this.messageSubject.next(message);
  }

  hide() {
    this._loading.next(false);
  }
}
