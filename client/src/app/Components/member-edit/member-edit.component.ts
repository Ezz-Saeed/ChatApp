import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IMember } from '../../Models/member';
import { IUser } from '../../Models/user';
import { AccountService } from '../../Services/account.service';
import { MembersService } from '../../Services/members.service';
import { take } from 'rxjs';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from "../photo-editor/photo-editor.component";
import {TimeagoModule} from 'ngx-timeago'

@Component({
  selector: 'app-member-edit',
  imports: [CommonModule, TabsModule, FormsModule, PhotoEditorComponent, TimeagoModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  member!:IMember;
  user!:IUser | null;
  @ViewChild('editForm')editForm!:NgForm;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private accountService:AccountService,
    private memberService:MembersService, private toastr:ToastrService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:res=>{
        this.user = res
      },
      error:err=>console.log(err)
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user!.userName).subscribe({
      next:res=>{
        this.member = res;
      },
      error:err=>console.log(err)
    })
  }

  updateProfile(){
    this.memberService.updateMember(this.member).subscribe({
      next:res=>{
        this.toastr.success('Profile updated successfully')
        this.editForm.reset(this.member);
      },
      error:err=>console.log(err)
    })
  }

}
