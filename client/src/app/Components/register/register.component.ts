import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any= {};
  @Output() cancelRegister = new EventEmitter();
  constructor(private accountService:AccountService,private toastr:ToastrService){}

  register(){
    this.accountService.register(this.model).subscribe({
      next:res=>{
        console.log(res);
        this.cancel();
      },
      error:err=>{
        console.log(err)
        this.toastr.error(err.error)
      }

    })
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Cancelled')
  }

}
