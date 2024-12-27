import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMember } from '../Models/member';


@Injectable({
  providedIn: 'root'
})

export class MembersService {
 baseUrl = Environment.apiUrl;

   constructor(private http:HttpClient){}

   getMembers(){
    return this.http.get<IMember[]>(`${this.baseUrl}/users`)
   }

   getMember(userName:string){
    return this.http.get<IMember>(`${this.baseUrl}/users/${userName}`)
   }

   updateMember(member:IMember){
    return this.http.put(`${this.baseUrl}/users`,member);
   }
}
