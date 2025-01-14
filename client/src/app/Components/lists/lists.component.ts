import { Component, OnInit } from '@angular/core';
import { IMember } from '../../Models/member';
import { MembersService } from '../../Services/members.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../member-card/member-card.component";
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-lists',
  imports: [CommonModule, FormsModule, MemberCardComponent, ButtonsModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {
  members?:Partial<IMember[]>;
  predicate = 'liked';

  constructor(private memberService:MembersService) {

  }
  ngOnInit(): void {
   this.loadFriends();
  }

  loadFriends(){
    this.memberService.getLikes(this.predicate).subscribe({
      next: res =>{
        this.members = res
      }
    })
  }
}
