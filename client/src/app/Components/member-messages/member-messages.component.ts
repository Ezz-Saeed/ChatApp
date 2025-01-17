import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMessage } from '../../Models/message';
import { MessageService } from '../../Services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  imports: [CommonModule, TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm!:NgForm;
  @Input() messages?:IMessage[] = [];
  @Input() userName?:string
  messageContent?:string;

  constructor(private messageService:MessageService){}
  ngOnInit(): void {

  }


  sendMessage(){
    if(this.userName && this.messageContent){
      this.messageService.sendMessage(this.userName,this.messageContent).subscribe({
        next: message=>{
          this.messages?.push(message);
          this.messageForm.reset();
        }
      })
    }
  }

}
