import { Component, OnInit } from '@angular/core';
import { IMember } from '../../Models/member';
import { MembersService } from '../../Services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { CommonModule } from '@angular/common';
import { IPagination } from '../../Models/pagination';
import {PaginationModule} from 'ngx-bootstrap/pagination'
import { FormsModule } from '@angular/forms';
import { UserParams } from '../../Models/userParams';
import { IUser } from '../../Models/user';
import {ButtonsModule} from 'ngx-bootstrap/buttons'


@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, CommonModule, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members?:IMember[]
  pagination?:IPagination;
  userParams!:UserParams;
  user!:IUser;
  genederList = [{value:'male', display:'Males'}, {value:'female', display:'Females'}]

  constructor(private membersService:MembersService,){
    this.userParams = membersService.getUserPArams();
  }

  ngOnInit(): void {
   this.loadMembers();
  }

  loadMembers(){
    this.membersService.setUserParasm(this.userParams);
    this.membersService.getMembers(this.userParams).subscribe({
      next: res=>{
        this.members = res.result;
        this.pagination = res.pagination;

      }
    })
  }

  resetFilters(){
    this.userParams = this.membersService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event:any){
    this.userParams.pageNumber = event.page;
    this.membersService.setUserParasm(this.userParams)
    this.loadMembers();
  }

}
