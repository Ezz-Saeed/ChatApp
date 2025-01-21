import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AccountService } from '../../Services/account.service';
import { CommonModule } from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'
import { Route, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HasRoleDirective } from '../../Directives/has-role.directive';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, CommonModule, BsDropdownModule, RouterModule, HasRoleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  model:any = {};

  constructor(public accountService:AccountService, private router:Router,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {

  }

  login(){
    this.accountService.login(this.model).subscribe({
      next:res=>{
        this.router.navigateByUrl('/members')
      },
      error:err=>{
        console.log(err)
        // this.toastr.error(err.statusText)
      }
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }


}

