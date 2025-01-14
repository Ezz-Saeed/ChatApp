import { Component, Input } from '@angular/core';
import { IMember } from '../../Models/member';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../Services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-card',
  imports: [RouterModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() member!:IMember;
  constructor(private memberService:MembersService, private toastr:ToastrService){}

  addLike(member:IMember){
    this.memberService.addLike(member.userName).subscribe({
      next: res=>{
        this.toastr.success('Liked');
      }
    })
  }
}
