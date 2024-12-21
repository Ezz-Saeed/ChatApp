import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./Components/nav/nav.component";
import { IUser } from './Models/user';
import { AccountService } from './Services/account.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Chat App';
  users!:any;

  constructor(private http:HttpClient, private accountService:AccountService){}
  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user:IUser = JSON.parse(localStorage.getItem('user')??'')??null
    this.accountService.setCurrentUser(user);
  }

  getUsers(){
    return this.http.get("http://localhost:5203/api/users").subscribe({
      next:res=>{
        this.users = res;
        // console.log(this.users)
      },
      error:err=>console.log(err)
    });
  }

}
