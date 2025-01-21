import { Component, OnInit } from '@angular/core';
import { HasRoleDirective } from '../../../Directives/has-role.directive';
import { IUser } from '../../../Models/user';
import { AdminService } from '../../../Services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [HasRoleDirective, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users?:Partial<IUser[]>;
  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.getUsersWithRoles()
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe({
      next:res=>{
        this.users = res
      }
    })
  }

}
