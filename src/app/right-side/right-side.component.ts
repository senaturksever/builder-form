import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormService } from 'src/services/FormService';
import { SavedForm } from 'src/services/FormService';
import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
  selector: 'app-right-side',
  standalone: true,
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.css'],
  imports: [CommonModule,DialogModule,FormBuilderComponent]
})

export class RightSideComponent {
  displayDialog: boolean = false; 
  selectedFormData: any; 
  savedForms: SavedForm[] = [];
  constructor(private formService:FormService){}

  ngOnInit() {
    this.loadSavedForms();

    this.formService.savedForms$.subscribe((forms) => {
      this.savedForms = forms;
    });
  }

  loadSavedForms(): void {
    const storedForms = localStorage.getItem('savedForms');
    if (storedForms) {
      this.savedForms = JSON.parse(storedForms);
    }
  }

  openFormDialog(form: SavedForm): void {
     if (form && form.data) {
        this.selectedFormData = form.data;  
        console.log('Selected Form Data:', this.selectedFormData);
    } else {
        console.error('Selected form data is undefined or null');
        this.selectedFormData = []; 
    }
    this.displayDialog = true; 
  }
}
