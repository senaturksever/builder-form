import { Component,Input,OnInit,ChangeDetectorRef ,SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropService } from '../functions/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';  
import { InputTextModule } from 'primeng/inputtext';  
import { InputTextareaModule } from 'primeng/inputtextarea';  
import { DataService } from 'src/DataService';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormService } from 'src/services/FormService';
import { SavedForm } from 'src/services/FormService';


@Component({
  selector: 'app-form-builder',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [  
    CommonModule,
    FormsModule, 
    DragDropModule,
    DropdownModule,  
    InputTextModule, 
    InputTextareaModule , 
    CalendarModule,
    DialogModule
  ],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})

export class FormBuilderComponent {
  
  @Input() formComponents: any[]=[];

  @Input() previewComponents : any[] = [];
  @Input() previewMode: boolean = false;
  
  displayPreviewDialog: boolean = false;



  formName: string = '';
  savedForms: SavedForm[] = [];

  constructor(public dragDropService: DragDropService,private dataService:DataService,private formService:FormService,
    private cdr: ChangeDetectorRef,) {}
  jsonData: any;

  ngOnInit() {
    this.formComponents = this.dragDropService.formComponents;
   
    if (!this.formComponents) {
      this.formComponents = [];
    }

    console.log('Form Components:', this.formComponents);
    this.dataService.getData().subscribe(data => {
      console.log("JSON Data Loaded: ", data); 
      this.jsonData = data;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formComponents'] && !changes['formComponents'].firstChange) {
      console.log('Form Components Updated:', this.formComponents);
      console.log("PriwewMode", this.previewMode)
      this.cdr.detectChanges();
    }
  }

  drop(event: any) {
    if(!this.previewMode){
      this.dragDropService.drop(event);
    }
  
  }

  getClassForComponent(component: any): string {
    return component.width === '100%' ? 'col-12' : 'col-6';
  }

  getDropdownOptions(id: string) {
    if (!id) {
        return []; 
    }
    switch (id) {
        case '1':
            return this.jsonData?.countries || [];
        case '2':
            const country = this.getCountrySelection();
            console.log('Selected Country:', country);
            return this.jsonData?.cities[country] || [];
        case '3':
            return this.jsonData?.ages || [];
        case '4':
            return this.jsonData?.jobs || [];
        default:
            return [];
    }
  }


  getCountrySelection(): string {
    const countryComponent = this.dragDropService.formComponents.find(c => c.id === '1');
    console.log("Selected Country Component:", countryComponent); // Debug için
    return countryComponent ? countryComponent.selectedValue : '';
  }

  removeComponent(index: number): void {
  this.dragDropService.formComponents.splice(index, 1);  
  }

 
  
}
