import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  model: any= {};
  @Output() cancelRegister = new EventEmitter();
  registerForm!:FormGroup;

  constructor(private accountService:AccountService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    })
  }

  register(){
    // this.accountService.register(this.model).subscribe({
    //   next:res=>{
    //     console.log(res);
    //     this.cancel();
    //   },
    //   error:err=>{
    //     console.log(err)
    //   }

    // })
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Cancelled')
  }

}
