import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AccountService } from '../../Services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model:any = {};
  isLoggesin = false;

  constructor(private accountService:AccountService){}

  login(){
    this.accountService.login(this.model).subscribe({
      next:res=>{
        console.log(res)
        this.isLoggesin = true;
      },
      error:err=>{
        console.log(err)
      }
    })
  }

  logout(){
    this.isLoggesin = false;
  }
}
