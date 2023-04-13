import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddTask:boolean = false;
  private subject: any = new Subject<any>();
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  
  constructor() { }

  toggelAddTask():void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

   onToggle():Observable<any>{
    return this.subject.asObservable();
   }


   updateIsLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }
}
