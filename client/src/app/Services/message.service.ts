import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { getPaginatedResult, getPaginationHeader } from './pagination.helper';
import { IMessage } from '../Models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = Environment.apiUrl;

  constructor(private http:HttpClient) { }

  getMessages(pageNumber:number,pageSize:number,container:string){
    let params = getPaginationHeader(pageNumber,pageSize);
    params = params.append('Container',container);
    return getPaginatedResult<IMessage[]>(`${this.baseUrl}/Messages`,params,this.http)
  }

  getMessageThred(userName:string){
    return this.http.get<IMessage[]>(`${this.baseUrl}/Messages/thread/${userName}`)
  }

  sendMessage(recipientUserName:string, content:string){
      return this.http.post<IMessage>(`${this.baseUrl}/Messages`, {recipientUserName,content})
    }
}
