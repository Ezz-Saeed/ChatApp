import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Chat App';
  users!:any;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    return this.http.get("http://localhost:5203/api/users").subscribe({
      next:res=>{
        this.users = res;
        console.log(this.users)
      },
      error:err=>console.log(err)
    });
  }

}
