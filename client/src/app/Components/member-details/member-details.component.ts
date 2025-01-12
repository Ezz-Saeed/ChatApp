import { Component, OnInit } from '@angular/core';
import { IMember } from '../../Models/member';
import { MembersService } from '../../Services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions} from '@kolkov/ngx-gallery'
import {TimeagoModule} from 'ngx-timeago'

@Component({
  selector: 'app-member-details',
  imports: [CommonModule, TabsModule, NgxGalleryModule, TimeagoModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit{
  galleryOptions!:NgxGalleryOptions[];
  galleryImages!:NgxGalleryImage[];
  member!:IMember;
  userName!:string
  constructor(private memberService:MembersService, private activatedRout:ActivatedRoute){}

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

}
