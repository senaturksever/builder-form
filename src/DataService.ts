import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService{
    private dataUrl = 'assets/data.json';

    constructor(private http:HttpClient){}

    getData():Observable<any>{
     let data =this.http.get(this.dataUrl);
     console.log(this.dataUrl);
     console.log(data);
      return data;
      
    }
}
