import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMember } from '../Models/member';

const options = {
  headers:new HttpHeaders({
    Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')!).token}`
  })
}

@Injectable({
  providedIn: 'root'
})

export class MembersService {
 baseUrl = Environment.apiUrl;

   constructor(private http:HttpClient){}

   getMembers(){
    return this.http.get<IMember[]>(`${this.baseUrl}/users`,options)
   }

   getMember(userName:string){
    return this.http.get<IMember>(`${this.baseUrl}/users/${userName}`,options)
   }
}
