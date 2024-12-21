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
  constructor(){}

  ngOnInit(): void {
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }


  cancelRegisterMode(event:boolean){
    this.registerMode = event
  }
}
