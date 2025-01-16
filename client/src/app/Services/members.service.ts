import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient,  } from '@angular/common/http';
import { IMember } from '../Models/member';
import { map, of, take } from 'rxjs';
import { UserParams } from '../Models/userParams';
import { AccountService } from './account.service';
import { IUser } from '../Models/user';
import { getPaginatedResult, getPaginationHeader } from './pagination.helper';


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
    let params = getPaginationHeader(userParams.pageNumber, userParams.pageSize);
    if(userParams.gender){
      params = params.append('gender', userParams.gender.toString())
    }
    params = params.append('maxAge', userParams.maxAge.toString())
    params = params.append('minAge', userParams.minAge.toString())
    params = params.append('orderBy', userParams.orderBy.toString())

    return getPaginatedResult<IMember[]>(`${this.baseUrl}/users`, params, this.http).pipe(
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



   addLike(userName:string){
    return this.http.post(`${this.baseUrl}/likes/${userName}`, {});
   }

   getLikes(predicate:string, pageNumber:number, pageSize:number){
    let params = getPaginationHeader(pageNumber,pageSize)
    params = params.append('predicate',predicate);
    return getPaginatedResult<Partial<IMember[]>>(`${this.baseUrl}/likes`,params, this.http);
   }
}
