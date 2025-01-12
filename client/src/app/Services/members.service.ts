import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMember } from '../Models/member';
import { map, of } from 'rxjs';
import { IPagination, PaginatedResult } from '../Models/pagination';
import { UserParams } from '../Models/userParams';


@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl = Environment.apiUrl;
  members:IMember[] = [];
  memberCash = new Map();

   constructor(private http:HttpClient){}

   getMembers(userParams:UserParams){
    let response = this.memberCash.get(Object.values(userParams).join('-'));
    if(response){
      return of(response)
    }
    let params = this.getPaginationHeader(userParams.pageNumber, userParams.pageSize);
    if(userParams.gender){
      params = params.append('gender', userParams.gender.toString())
    }
    params = params.append('maxAge', userParams.maxAge.toString())
    params = params.append('minAge', userParams.minAge.toString())
    params = params.append('orderBy', userParams.orderBy.toString())

    return this.getPaginatedResult<IMember[]>(`${this.baseUrl}/users`, params).pipe(
      map(response=>{
        this.memberCash.set(Object.values(userParams).join('-'), response)
        return response;
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

   private getPaginatedResult<T>(url:string, params:HttpParams){
    const paginatedResult:PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, {observe:'response', params}).pipe(
      map(res=>{
        if(res.body){
          paginatedResult.result = res.body
        }
        if(res.headers.get('Pagination') !== null){
          paginatedResult.pagination = JSON.parse(res.headers.get('Pagination')!)
        }
        return paginatedResult
      })
    )
   }

   private getPaginationHeader(pageNumber:number, pageSize:number){
    let params = new HttpParams();
      params = params.append('pageNumber', pageNumber!.toString())
      params = params.append('pageSize', pageSize!.toString())
    return params;
   }
}
