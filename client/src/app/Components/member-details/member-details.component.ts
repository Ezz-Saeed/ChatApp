import { Component, OnInit } from '@angular/core';
import { IMember } from '../../Models/member';
import { MembersService } from '../../Services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TabsModule} from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-details',
  imports: [CommonModule, TabsModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit{
  member!:IMember;
  userName!:string
  constructor(private memberService:MembersService, private activatedRout:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe(params=>{
      this.userName = params.get('username')!.toString();
    })
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.userName).subscribe({
      next:res=>{
        this.member = res;
      },
      error:err=>console.log(err)
    })
  }

}
