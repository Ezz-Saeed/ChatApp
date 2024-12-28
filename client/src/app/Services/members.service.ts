import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMember } from '../Models/member';
import { map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl = Environment.apiUrl;
  members:IMember[] = [];

   constructor(private http:HttpClient){}

   getMembers(){
    if(this.members.length>0) return of(this.members);
    return this.http.get<IMember[]>(`${this.baseUrl}/users`).pipe(
      map(members=>{
        this.members = members
        return members;
      })
    )
   }

   getMember(userName:string){
    const member = this.members.find(m=>m.userName === userName);
    if(member !== undefined) return of(member);
    return this.http.get<IMember>(`${this.baseUrl}/users/${userName}`)
   }

   updateMember(member:IMember){
    return this.http.put(`${this.baseUrl}/users`,member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
   }
}
