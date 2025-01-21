import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { take } from 'rxjs';
import { IUser } from '../Models/user';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole?:string[]
  user?:IUser

  constructor(private viewContainerRef:ViewContainerRef,
    private templateRef:TemplateRef<any>, private accountService:AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user=>{
          this.user = user!;
        }
      })
    }

  ngOnInit(): void {
    if(!this.user?.roles || this.user===null){
      this.viewContainerRef.clear();
    }

    if(this.user?.roles.some(r=> this.appHasRole?.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainerRef.clear();
    }
  }

}
