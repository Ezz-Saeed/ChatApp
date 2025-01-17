import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { IMember } from "../Models/member";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MembersService } from "../Services/members.service";

@Injectable({
  providedIn:'root'
})
export class MemberDetailedResolver implements Resolve<IMember>{
  constructor(private memberService:MembersService){}

  resolve(route: ActivatedRouteSnapshot, ): Observable<IMember> {
    return this.memberService.getMember(route.paramMap.get('username')!)
  }

}