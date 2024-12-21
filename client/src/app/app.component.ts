import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from "./Components/nav/nav.component";
import { IUser } from './Models/user';
import { AccountService } from './Services/account.service';
import { HomeComponent } from "./Components/home/home.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Chat App';
  users!:any;

  constructor( private accountService:AccountService){}
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user:IUser = JSON.parse(localStorage.getItem('user')??'')??null
    this.accountService.setCurrentUser(user);
  }



}
