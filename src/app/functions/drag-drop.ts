import { Injectable, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  formComponents: any[] = [];
  
  drop(event: CdkDragDrop<any[]>, targetArray: any[] = this.formComponents) {
    if (event.previousContainer === event.container) {
      moveItemInArray(targetArray, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        targetArray,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  removeComponentFromList(id: string | undefined) {
    if (id) {
      const componentIndex = this.formComponents.findIndex(component => component.id === id);
      if (componentIndex > -1) {
        this.formComponents.splice(componentIndex, 1);
      }
    }
  }

  addComponent(type: string, name: string, width: string, alignment?: string, id?: string) {
    const newComponent = {
        type,
        name,
        width,
        alignment: alignment || '',
        id: id || ''
    };
    this.formComponents.push(newComponent);

    
  }
}

