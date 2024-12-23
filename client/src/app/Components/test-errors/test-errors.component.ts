import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [CommonModule],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = `http://localhost:5203/api/buggy`
  validationErrors:string[] = [];
  constructor(private http:HttpClient){}

  get404Error(){
    return this.http.get(`${this.baseUrl}/notFound`).subscribe({
      next:res=>{
        console.log(res);
      },
      error:err=>console.log(err)
    })
  }

  get400Error(){
    return this.http.get(`${this.baseUrl}/badRequest`).subscribe({
      next:res=>{
        console.log(res);
      },
      error:err=>console.log(err)
    })
  }

  get401Error(){
    return this.http.get(`${this.baseUrl}/auth`).subscribe({
      next:res=>{
        console.log(res);
      },
      error:err=>console.log(err)
    })
  }

  get500Error(){
    return this.http.get(`${this.baseUrl}/serverError`).subscribe({
      next:res=>{
        console.log(res);
      },
      error:err=>console.log(err)
    })
  }

  get400ValidationError(){
    return this.http.post(`http://localhost:5203/api/accounts/register`, {}).subscribe({
      next:res=>{
        console.log(res);
      },
      error:err=>{
        console.log(err)
        this.validationErrors = err;
      }
    })
  }



}
