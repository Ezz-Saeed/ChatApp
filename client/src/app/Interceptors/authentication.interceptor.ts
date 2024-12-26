import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { IUser } from '../Models/user';
import { take } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  let currentUser!:IUser | null;
  accountService.currentUser$.pipe(take(1)).subscribe({
    next:user=>{
      currentUser = user
    }
  });

  if(currentUser){
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${currentUser.token}`
      }
    })
  }
  return next(req);
};
