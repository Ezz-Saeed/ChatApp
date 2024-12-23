import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router)
  return next(req).pipe(
    catchError(error=>{
      if(error){
        switch(error.status){
          case 400:
            if(error.error.errors){
              const modelStateErrors = []
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modelStateErrors.push(error.error.errors[key])
                }
              }
              toastr.error(error.status,modelStateErrors.join())
              throw modelStateErrors.flat();

            }else{
              toastr.error(error.statusText,error.status)
            }
            break;

            case 401:
              toastr.error(error.statusText,error.status)
              break;

            case 404:
              router.navigateByUrl('/notFound');
              break;

            case 500:
              const navigationExtras:NavigationExtras = {state:{error:error.error}}
              router.navigateByUrl('/serverError', navigationExtras);
              break;
            default:
              toastr.error('Something went wrong!')
              console.log(error);
              break;

        }
      }
      return throwError(error);
    })
  );
};
