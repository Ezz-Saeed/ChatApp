import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = Environment.apiUrl;

  constructor(private http:HttpClient) { }

  getUsersWithRoles(){
    return this.http.get<Partial<IUser[]>>(`${this.baseUrl}/Admin/usersWithRoles`)
  }
}
