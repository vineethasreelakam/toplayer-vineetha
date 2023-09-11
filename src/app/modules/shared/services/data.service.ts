import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
    private addLinkType$ = new BehaviorSubject<any>(null);
    addedLinkTypeData$ = this.addLinkType$.asObservable();

    private getLinkType$ = new BehaviorSubject<any>(null);
    getAddedLinkTypeData$ = this.getLinkType$.asObservable();

  constructor() { }

  addedLinkType(data: any) {
    this.addLinkType$.next(data)
  }

  getAddedLinkType(data: any) {
    this.getLinkType$.next(data)
  }
  

}
