import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { SavedForm } from 'src/services/FormService';
import { DragDropService } from '../functions/drag-drop';
import { FormBuilderComponent } from '../form-builder/form-builder.component';
import { FormService } from 'src/services/FormService';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.css'],
  imports:[DialogModule,CommonModule,FormBuilderComponent,FormsModule],
  standalone:true
})

export class PreviewFormComponent {
  displayDialog: boolean = false; 
  previewData: any; 
  formName: string = '';
  savedForms: SavedForm[] = [];

  constructor(public dragDropService: DragDropService,private formService:FormService) {}
  openPreview():void{
  this.displayDialog =true;
  }


  saveForm(): void {
    if (!this.formName.trim()) {
      alert('Lütfen form adı girin');
      return;
    }
  
    const storedForms = localStorage.getItem('savedForms');
    if (storedForms) {
      this.savedForms = JSON.parse(storedForms);
    }
  
    const existingFormIndex = this.savedForms.findIndex(form => form.name === this.formName);
    if (existingFormIndex > -1) {
      const overwrite = confirm('Aynı isimde bir form var, değiştirmek ister misiniz?');
      if (!overwrite) {
        return;
      }
      this.savedForms[existingFormIndex].data = [...this.dragDropService.formComponents];
    } else {
      this.savedForms.push({ name: this.formName, data: [...this.dragDropService.formComponents] });
    }
  
    localStorage.setItem('savedForms', JSON.stringify(this.savedForms));
    this.formService.updateSavedForms(this.savedForms);
  
    this.closePreview();
  }

  
  closePreview(): void {
    this.displayDialog =false;
  }
}
