import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../../Models/message';
import { MessageService } from '../../Services/message.service';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  imports: [CommonModule, TimeagoModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
  @Input() userName?:string;
  messages!:IMessage[];

  constructor(private messageService:MessageService){}
  ngOnInit(): void {
   this.loadMessageThread();
  }

  loadMessageThread(){
    if(this.userName){
      this.messageService.getMessageThred(this.userName).subscribe({
        next:res=>{
          this.messages = res;
        }
      })
    }
  }


}
