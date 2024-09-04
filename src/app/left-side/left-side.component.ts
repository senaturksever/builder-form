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


  constructor(private dragDropService: DragDropService) {}

  logCommand(subItem: any) {
    console.log(subItem);
    subItem.command();
  }
  
  ngOnInit() {
      this.items = [
          {
              label: 'Text',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {
                    type: "input",
                    name: "Text Input",
                      label: 'Tam Ekran',
                      icon: 'pi pi-fw pi-align-left',
                      width: '100%'
                  },
                  {
                    type: "input",
                    name: "Text Input",
                      label: 'Yarım Ekran',
                      icon: 'pi pi-fw pi-align-right',
                      width: '50%'
                  }
              ]
          },
          {
              label: 'Dropdown',
              icon: 'pi pi-fw pi-user',
              
              items: [
                  {   id: '1',
                      label: 'Ülke',
                      type: 'dropdown',
                      name: 'Dropdown',
                      width: '50%',
                      icon: 'pi pi-fw pi-user-plus'
                  },
                  {
                    id:'2',
                    label: 'Şehir',
                    type: 'dropdown',
                    name: 'Dropdown',
                    icon: 'pi pi-fw pi-user-plus',
                    width: '50%'
                  },
                  {
                    id:'3',
                    label: 'Yaş',
                    type: 'dropdown',
                    name: 'Dropdown',
                    icon: 'pi pi-fw pi-user-plus',
                    width: '50%'
                  },
                  {
                    id:'4',
                    label: 'Meslek',
                    type: 'dropdown',
                    name: 'Dropdown',
                    icon: 'pi pi-fw pi-user-plus',
                    width: '50%'
                  },
              ]
          },
          {
            label: 'TextArea',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Tam ekran',
                    type: 'inputTextarea',
                    name: 'Textarea',
                    icon: 'pi pi-fw pi-user-plus',
                    width: '100%'
                },
                {
                  label: 'Yarım ekran',
                  type: 'inputTextarea',
                  icon: 'pi pi-fw pi-user-plus',
                  width: '50%'
                },
            ]
        },
        {
          label: 'Button',
          icon: 'pi pi-fw pi-user',
          items: [
              {
                  label: 'Sol',
                  type: 'button',
                  name: 'Button',
                  icon: 'pi pi-fw pi-user-plus',
                  width: '100%',
                  alignment: 'left'
              },
              {
                  label: 'Orta',
                  type: 'button',
                  name: 'Button',
                  icon: 'pi pi-fw pi-user-plus',
                  width: '100%',
                  alignment: 'center'
              },
              {
                  label: 'Sağ',
                  type: 'button',
                   name: 'Button',
                   icon: 'pi pi-fw pi-user-plus',
                   width: '100%',
                   alignment: 'right',
              },
          ]
      },
        {
            label: 'Tarih',
            icon: 'pi pi-fw pi-date',
            items:[
              {
                label: 'Tam ekran',
                type: 'date',
                name: 'Date',
                icon: 'pi pi-fw pi-user-plus',
                width: '100%'
            },
            {
              label: 'Yarım ekran',
              type: 'date',
              name: 'Date',
              icon: 'pi pi-fw pi-user-plus',
              width: '50%'
            },
            ]
            
           
        },
      ];
  }
  drop(event: any) {
    const dropItem = event.item.data;
    console.log(dropItem)
    if(dropItem.command){
      dropItem.command();
    }
    this.dragDropService.drop(event.item.data);
  }

  handleComponentAdd(type: string, name: string, width: string, alignment?: string, id?: string) {
   console.log('handleComponentAdd triggered:', { type, name, width });
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
