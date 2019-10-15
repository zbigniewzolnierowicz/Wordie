import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private internalStatus = new BehaviorSubject<string>('initial');
  constructor() {}
  setStatus(status: string) {
    this.internalStatus.next(status);
    console.log(this.internalStatus.value);
  }
  get status() {
    return this.internalStatus.value;
  }
  get statusObservable() {
    return this.internalStatus.asObservable();
  }
}
