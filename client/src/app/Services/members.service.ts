import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMember } from '../Models/member';
import { map, of } from 'rxjs';
import { IPagination, PaginatedResult } from '../Models/pagination';


@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl = Environment.apiUrl;
  members:IMember[] = [];
  paginatedResult:PaginatedResult<IMember[]> = new PaginatedResult<IMember[]>();

   constructor(private http:HttpClient){}

   getMembers(page?:number, size?:number){
    let params = new HttpParams();
    if(page !== null && size !== null){
      params = params.append('pageNumber', page!.toString())
      params = params.append('pageSize', size!.toString())
    }
    return this.http.get<IMember[]>(`${this.baseUrl}/users`, {observe:'response', params}).pipe(
      map(res=>{
        if(res.body){
          this.paginatedResult.result = res.body
          console.log(res.body)
        }
        if(res.headers.get('Pagination') !== null){
          this.paginatedResult.pagination = JSON.parse(res.headers.get('Pagination')!)
          console.log("Pagination:" + this.paginatedResult.result)
        }
        return this.paginatedResult
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

   setMainPhoto(photoId:number){
    return this.http.put(`${this.baseUrl}/users/setMainPhoto/${photoId}`,{});
   }

   dletePhoto(id:number){
    return this.http.delete(`${this.baseUrl}/users/deletePhoto/${id}`);
   }
}
