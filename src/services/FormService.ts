import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface SavedForm {
  name: string;
  data: any;
}
@Injectable({
  providedIn: 'root'
})
export class FormService {
  private savedFormsSubject = new BehaviorSubject<SavedForm[]>([]);
  savedForms$ = this.savedFormsSubject.asObservable();

  updateSavedForms(forms: SavedForm[]): void {
    this.savedFormsSubject.next(forms);
  }
}
