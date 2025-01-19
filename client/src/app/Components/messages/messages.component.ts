import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../Models/message';
import { IPagination } from '../../Models/pagination';
import { MessageService } from '../../Services/message.service';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  imports: [CommonModule, ButtonsModule, FormsModule, RouterModule, TimeagoModule, PaginationModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  messages?:IMessage[] = []
  pagination?:IPagination
  pageNumber = 1
  pageSize=5
  container = 'Unread'
  loading = false;
  constructor(private messageService:MessageService, private router:Router){}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.loading = true;
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe({
      next: res=>{
        this.messages = res.result;
        this.pagination = res.pagination;
        this.loading=false
      }
    })

  }

  pageChanged(event:any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

  getRouterLink(message:IMessage, tab:number){
    let params = new HttpParams();
      params = params.append('tab',3);
    if(this.container === 'Outbox'){

      this.router.navigate([`/members/${message.recipientUserName}`,params])
      // return `/members/${message.recipientUserName}?tab=${tab.toString()}`
    }
    this.router.navigate([`/members/${message.senderUserName}`,params])
  }

  deleteMessage(id:number){
    this.messageService.deleteMessage(id).subscribe({
      next: res=>{
        this.messages?.splice(this.messages.findIndex(m=>m.id===id),1);
      }
    })
  }

}
