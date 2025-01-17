import { Component, OnInit, ViewChild } from '@angular/core';
import { IMember } from '../../Models/member';
import { MembersService } from '../../Services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TabDirective, TabsetComponent, TabsModule} from 'ngx-bootstrap/tabs';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions} from '@kolkov/ngx-gallery'
import {TimeagoModule} from 'ngx-timeago'
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { IMessage } from '../../Models/message';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-member-details',
  imports: [CommonModule, TabsModule, NgxGalleryModule, TimeagoModule, MemberMessagesComponent],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit{
  galleryOptions!:NgxGalleryOptions[];
  galleryImages!:NgxGalleryImage[];
  member!:IMember;
  userName!:string
  @ViewChild('memeberTams') memberTabs!:TabsetComponent
  activeTab?:TabDirective
  messages?:IMessage[] = [];
  constructor(private memberService:MembersService, private activatedRout:ActivatedRoute,
    private messageService:MessageService
  ){}

  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe(params=>{
      this.userName = params.get('username')!.toString();
    })
    this.loadMember();
    this.galleryOptions = [
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false,
      }
    ]
  }

  getImages():NgxGalleryImage[]{
    const imageUrls = []
    for(const photo of this.member.photos){
      imageUrls.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url,
      })
    }
    return imageUrls;
  }

  loadMember(){
    this.memberService.getMember(this.userName).subscribe({
      next:res=>{
        this.member = res;
        this.galleryImages = this.getImages();
      },
      error:err=>console.log(err)
    })
  }

  loadMessageThread(){
      this.messageService.getMessageThred(this.member.userName).subscribe({
        next:res=>{
          this.messages = res;
        }
      })

  }

  onTabActivated(data:TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages?.length === 0){
      this.loadMessageThread();
    }

  }

}
