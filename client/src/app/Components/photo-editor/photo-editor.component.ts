import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../Models/member';
import { CommonModule } from '@angular/common';
import {FileUploader, FileUploadModule} from 'ng2-file-upload'
import { Environment } from '../../Environments/environment';
import { IUser } from '../../Models/user';
import { AccountService } from '../../Services/account.service';
import { take } from 'rxjs';
import { IPhoto } from '../../Models/photo';
import { MembersService } from '../../Services/members.service';

@Component({
  selector: 'app-photo-editor',
  imports: [CommonModule, FileUploadModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  @Input()member!:IMember;
  uploader!:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = Environment.apiUrl;
  user!:IUser | null;

  constructor(private accountService: AccountService,private membersService:MembersService) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next:user=>{
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
   this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo:IPhoto){
    this.membersService.setMainPhoto(photo.id).subscribe({
      next:()=>{
        this.user!.photpUrl = photo.url;
        this.accountService.setCurrentUser(this.user!);
        this.member.photoUrl = photo.url;
        this.member.photos.forEach(p=>{
          if(p.isMain) p.isMain=false;
          if(p.id===photo.id) p.isMain=true;
        })
      }
    })
  }

  dletePhoto(id:number){
    this.membersService.dletePhoto(id).subscribe({
      next:()=>{
        this.member.photos = this.member.photos.filter(p=>p.id !== id);
      }
    })
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url:`${this.baseUrl}/users/addPhoto`,
      authToken:`Bearer ${this.user?.token}`,
      removeAfterUpload:true,
      autoUpload:false,
      isHTML5:true,
      allowedFileType:['image'],
      maxFileSize:10 * 1024 * 1024,
    })
    this.uploader.onAfterAddingFile = (file)=>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item,response,status,header)=>{
      if(response){
        const photo:IPhoto = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }

}
