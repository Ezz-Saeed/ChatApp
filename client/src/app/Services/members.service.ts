import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMember } from '../Models/member';
import { map, of, take } from 'rxjs';
import { PaginatedResult } from '../Models/pagination';
import { UserParams } from '../Models/userParams';
import { AccountService } from './account.service';
import { IUser } from '../Models/user';


@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl = Environment.apiUrl;
  members:IMember[] = [];
  memberCash = new Map();
  user!:IUser
  userParams!:UserParams

   constructor(private http:HttpClient, accountService: AccountService){
    accountService.currentUser$.pipe(take(1)).subscribe({
          next: user=>{
            this.userParams = new UserParams(user!)
            this.user = user!
          },
          error: err=>console.log(err)

        })
   }

   getUserPArams(){
    return this.userParams;
   }

   setUserParasm(params:UserParams){
    this.userParams = params;
   }

   resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
   }

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
    const member = [...this.memberCash.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((member:IMember) => member.userName === userName);

    if(member) return of(member)
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

   addLike(userName:string){
    return this.http.post(`${this.baseUrl}/likes/${userName}`, {});
   }

   getLikes(predicate:string){
    return this.http.get<Partial<IMember[]>>(`${this.baseUrl}/likes?predicate=${predicate}`);
   }
}
