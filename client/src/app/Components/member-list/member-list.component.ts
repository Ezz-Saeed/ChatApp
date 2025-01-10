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
import { AccountService } from '../../Services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, CommonModule, PaginationModule, FormsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members?:IMember[]
  pagination?:IPagination;
  userParams!:UserParams;
  user!:IUser

  constructor(private membersService:MembersService, accountService:AccountService){
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=>{
        this.userParams = new UserParams(user!)
      },
      error: err=>console.log(err)

    })
  }

  ngOnInit(): void {
   this.loadMembers();
  }

  loadMembers(){
    this.membersService.getMembers(this.userParams).subscribe({
      next: res=>{
        this.members = res.result;
        this.pagination = res.pagination;

      }
    })
  }

  pageChanged(event:any){
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }

}
