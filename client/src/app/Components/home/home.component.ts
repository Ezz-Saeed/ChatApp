import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users:any;
  constructor(private http:HttpClient,){}

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getUsers(){
    this.http.get('http://localhost:5203/api/users').subscribe({
      next:res=> {
        this.users = res
        console.log(this.users);
      },
      error:err=>console.log(err)
    })
  }

  cancelRegisterMode(event:boolean){
    this.registerMode = event
  }
}
