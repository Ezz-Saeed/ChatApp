import { Component, OnInit } from '@angular/core';
import { IMember } from '../../Models/member';
import { MembersService } from '../../Services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { CommonModule } from '@angular/common';
import { IPagination } from '../../Models/pagination';
import {PaginationModule} from 'ngx-bootstrap/pagination'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, CommonModule, PaginationModule, FormsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members?:IMember[]
  pagination?:IPagination;
  pageNumber = 2;
  pageSize = 5;
  constructor(private membersService:MembersService){}

  ngOnInit(): void {
   this.loadMembers();
  }

  loadMembers(){
    this.membersService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: res=>{
        this.members = res.result;
        this.pagination = res.pagination;

      }
    })
  }

  pageChanged(event:any){
    this.pageNumber = event.page;
    this.loadMembers();
  }

}
