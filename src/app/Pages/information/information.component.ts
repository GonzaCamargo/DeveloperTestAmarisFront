import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnDestroy {


  employees: Array<Employee> = [];
  displayedColumns: string[] = ['id', 'Name', 'Salary', 'Age','Profile Image','Anual Salary'];
  formSearchEmployee:FormGroup;
  dataSource = this.employees;

  constructor(private fb:FormBuilder, private employeeService: EmployeeService, private snack: MatSnackBar){
    this.formSearchEmployee = fb.group({
      idEmployee: new FormControl('')
    })
  }
  ngOnDestroy(): void {
    this.employeeService.cancelRequest();
  }

  getEmployee(){
    let employee = new Employee;
    let idEmployee = employee.id = this.formSearchEmployee.get('idEmployee')?.value;
    if (idEmployee == null || idEmployee == '') {
      this.employeeService.getAllEmployees().subscribe(
      (res) =>{
        this.employees = res;
        this.dataSource = res;
      },
      (error) =>{
        console.log(error);
        this.snack.open(error.error.message,'Acceptar',{
          duration:3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      });
      
    }else{
      this.employeeService.getOneEmployee(idEmployee).subscribe(res => {
        this.dataSource = new Array();
        this.dataSource.push(res);
      },error =>{
        console.log("Mensaje ",error.error.message);
        this.snack.open(error.error.message,'Acceptar',{
          duration:3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      })
    }
  }

  cancelResquest(){
    this.employeeService.cancelRequest();
  }



}
