import { Component, OnInit } from '@angular/core';
import { IMember } from '../../Models/member';
import { MembersService } from '../../Services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, CommonModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members!:IMember[];
  constructor(private membersService:MembersService){}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.membersService.getMembers().subscribe({
      next:res=>{
        this.members=res;
      },
      error:err=>console.log(err)
    })
  }

}
