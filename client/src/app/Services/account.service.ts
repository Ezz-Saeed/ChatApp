import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../Models/user';
import { map, ReplaySubject } from 'rxjs';
import { Environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = Environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient){}

  login(model:any){
    return this.http.post<IUser>(`${this.baseUrl}/accounts/login`, model).pipe(
      map((response: IUser)=>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post<IUser>(`${this.baseUrl}/accounts/register`, model).pipe(
      map(user=>{
        if(user){
          this.setCurrentUser(user);
          this.currentUserSource.next(user);
        }
      })
    )
  }


  setCurrentUser(user:IUser){
    localStorage.setItem('user',JSON.stringify(user))
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
