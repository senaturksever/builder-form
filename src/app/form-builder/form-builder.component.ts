import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropService } from '../functions/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CheckboxModule } from 'primeng/checkbox';  // Import PrimeNG CheckboxModule
import { DropdownModule } from 'primeng/dropdown';  // Import PrimeNG DropdownModule
import { InputTextModule } from 'primeng/inputtext';  // Import PrimeNG InputTextModule
import { InputTextareaModule } from 'primeng/inputtextarea';  // Import PrimeNG InputTextareaModule
import { DataService } from 'src/DataService';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [  
    CommonModule,
    FormsModule,  // Ensure FormsModule is imported
    DragDropModule,
    CheckboxModule,  // Ensure CheckboxModule is imported
    DropdownModule,  // Ensure DropdownModule is imported
    InputTextModule,  // Ensure InputTextModule is imported
    InputTextareaModule , // Ensure InputTextareaModule is imported
  CalendarModule
  ],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})

export class FormBuilderComponent {
  constructor(public dragDropService: DragDropService,private dataService:DataService) {}
  jsonData: any;

  drop(event: any) {
    this.dragDropService.drop(event);
  }

  getClassForComponent(component: any): string {
    return component.width === '100%' ? 'col-12' : 'col-6';
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      console.log("JSON Data Loaded: ", data); 
      this.jsonData = data;
    });
  }


  getDropdownOptions(id: string) {
    if (!id) {
        return []; // Eğer id undefined veya boşsa, boş bir dizi döndür
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
}
