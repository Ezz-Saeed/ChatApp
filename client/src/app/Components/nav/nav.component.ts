import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AccountService } from '../../Services/account.service';
import { CommonModule } from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, CommonModule, BsDropdownModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  model:any = {};

  constructor(public accountService:AccountService){}

  ngOnInit(): void {

  }

  login(){
    this.accountService.login(this.model).subscribe({
      next:res=>{
        console.log(res)
      },
      error:err=>{
        console.log(err)
      }
    })
  }

  logout(){
    this.accountService.logout();
  }


}

