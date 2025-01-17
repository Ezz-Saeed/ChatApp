import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../Models/message';
import { IPagination } from '../../Models/pagination';
import { MessageService } from '../../Services/message.service';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';

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
  container = 'Outbox'
  constructor(private messageService:MessageService){}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe({
      next: res=>{
        this.messages = res.result;
        this.pagination = res.pagination;
      }
    })
  }

  pageChanged(event:any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

}
