import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
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
      userName: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,
        Validators.minLength(4),Validators.maxLength(8)]),
      confirmPassword: new FormControl('',[Validators.required, this.matchValue('password')]),
    })

    this.registerForm?.get('password')?.valueChanges.subscribe({
      next:()=>{
        this.registerForm.get('confirmPassword')?.updateValueAndValidity()
      }
    })
  }

  matchValue(matchTo:string): ValidatorFn{
    return (control:AbstractControl)=>{
      return control.value === control?.parent?.get(matchTo)?.value
      ? null : {isNotMatch:true}
    }
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
