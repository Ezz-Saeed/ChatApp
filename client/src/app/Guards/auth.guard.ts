import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../Services/account.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)
  const toastr = inject(ToastrService)

  return accountService.currentUser$.pipe(
    map(user=>{
      if(user){
        return true
      }
      else {
        toastr.error('Unauthorized user!')
        return false
      }
    })
  )
};
