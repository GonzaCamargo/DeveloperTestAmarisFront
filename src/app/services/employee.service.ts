import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  ruta = baseUrl;
  private unsuscribe$ = new Subject<void>(); 

  constructor(private http:HttpClient) { }

  getAllEmployees(){
    return this.http.get<Employee[]>(`${baseUrl}/employees/`)
    .pipe(
      takeUntil(this.unsuscribe$)
    );
  }

  getOneEmployee(idEmployee:number){
    return this.http.get<Employee>(`${baseUrl}/employees/${idEmployee}`)
    .pipe(
      takeUntil(this.unsuscribe$)
    );
  }

  cancelRequest(): void{
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
