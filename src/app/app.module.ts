import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftSideComponent } from './left-side/left-side.component'; // Standalone bileşeni içe aktarıyoruz
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilderComponent } from "./form-builder/form-builder.component";
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RightSideComponent } from './right-side/right-side.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeftSideComponent, // Standalone bileşeni burada ekliyoruz
    BrowserAnimationsModule,
    FormBuilderComponent,
    HttpClientModule,
    MatDialogModule,
    RightSideComponent,
    PreviewFormComponent,
    DragDropModule
],
exports: [
  FormBuilderComponent,  // Export if used in other modules
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
