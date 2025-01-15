import { Component, OnInit } from '@angular/core';
import { IMember } from '../../Models/member';
import { MembersService } from '../../Services/members.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../member-card/member-card.component";
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { IPagination } from '../../Models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  imports: [CommonModule, FormsModule, MemberCardComponent, ButtonsModule, PaginationModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {
  members?:Partial<IMember[]>;
  predicate = 'liked';
  pageNumber = 1
  pageSize = 5
  pagination?:IPagination

  constructor(private memberService:MembersService) {

  }
  ngOnInit(): void {
   this.loadFriends();
  }

  loadFriends(){
    this.memberService.getLikes(this.predicate, this.pageNumber,this.pageSize).subscribe({
      next: res =>{
        this.members = res.result;
        this.pagination = res.pagination
      }
    })
  }

  pageChanged(event:any){
    this.pageNumber = event.page;
    this.loadFriends();
  }
}
