import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { DragDropService } from '../functions/drag-drop';
import { EditorModule } from 'primeng/editor';
import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css'],
  standalone: true,
  imports: [  
    CommonModule,  // Angular'ın ortak modülleri
    PanelMenuModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    DragDropModule,
    FormsModule,
    EditorModule
  ]
})
export class LeftSideComponent implements OnInit {

  

  items: (MenuItem & { type?: string, name?: string })[] = []; 
  formComponents: any[] = []; 

  constructor(private dragDropService: DragDropService) {}


  ngOnInit() {
      this.items = [
          {
              label: 'Text',
              type: "input",
              name: "Text Input",
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {
                      label: 'Tam Ekran',
                      icon: 'pi pi-fw pi-align-left',
                      command: () => this.handleComponentAdd('input', 'Text Input', '100%')
                  },
                  {
                      label: 'Yarım Ekran',
                      icon: 'pi pi-fw pi-align-right',
                      command: () => this.handleComponentAdd('input', 'Text Input', '50%')
                  }
              ]
          },
          {
              label: 'Dropdown',
              type: 'dropdown',
              name: 'Dropdown',
              icon: 'pi pi-fw pi-user',
              items: [
                  {   id: '1',
                      label: 'Ülke',
                      icon: 'pi pi-fw pi-user-plus',
                      command: () => this.handleComponentAdd('dropdown', 'Dropdown', '50%', '', '1')
                  },
                  {
                    id:'2',
                    label: 'Şehir',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => this.handleComponentAdd('dropdown', 'Dropdown', '50%', '','2')
                  },
                  {
                    id:'3',
                    label: 'Yaş',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => this.handleComponentAdd('dropdown', 'Dropdown', '50%', '', '3')
                  },
                  {
                    id:'4',
                    label: 'Meslek',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => this.handleComponentAdd('dropdown', 'Dropdown', '50%', '', '4')
                  },
              ]
          },
          {
            label: 'TextArea',
            type: 'inputTextarea',
            name: 'Textarea',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Tam ekran',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => this.handleComponentAdd('inputTextarea', 'Textarea', '100%')
                },
                {
                  label: 'Yarım ekran',
                  icon: 'pi pi-fw pi-user-plus',
                  command: () => this.handleComponentAdd('inputTextarea', 'Textarea', '50%')
                },
            ]
        },
        {
          label: 'Button',
          type: 'button',
          name: 'Button',
          icon: 'pi pi-fw pi-user',
          items: [
              {
                  label: 'Sol',
                  icon: 'pi pi-fw pi-user-plus',
                  command: () => this.handleComponentAdd('button', 'Button', '100%', 'left')
              },
              {
                  label: 'Orta',
                  icon: 'pi pi-fw pi-user-plus',
                  command: () => this.handleComponentAdd('button', 'Button', '100%', 'center')
              },
              {
                  label: 'Sağ',
                  icon: 'pi pi-fw pi-user-plus',
                  command: () => this.handleComponentAdd('button', 'Button', '100%', 'right')
              },
          ]
      },
        {
            label: 'Tarih',
            type: 'date',
            name: 'Date',
            icon: 'pi pi-fw pi-date',
            command: () => this.handleComponentAdd('date', 'Date', '50%', 'left')
           
        },
      ];
  }
  drop(event: any) {
    this.dragDropService.drop(event);
  }

  handleComponentAdd(type: string, name: string, width: string, alignment?: string, id?: string) {
    this.dragDropService.addComponent(type, name, width, alignment, id);
    
    
    this.removeItemFromMenu(id);
  }
  removeItemFromMenu(id: string | undefined) {
    if (id) {
      this.items = this.items.map(group => ({
        ...group,
        items: group.items?.filter(item => item.id !== id)
      }));
    }
  }


}
