import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from "../text-input/text-input.component";
import { DateInputComponent } from '../date-input/date-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TextInputComponent, DateInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!:FormGroup;
  maxDate!:Date;
  validationErrors:string[] = [];

  constructor(private accountService:AccountService,private toastr:ToastrService,
    private fb:FormBuilder, private router:Router){}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      userName: ['',Validators.required],
      gender: ['male'],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['',[Validators.required,
        Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required, this.matchValue('password')]],
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
    this.accountService.register(this.registerForm.value).subscribe({
      next:res=>{
        this.router.navigateByUrl('/members')
      },
      error:err=>{
        this.validationErrors = err;
      }

    })
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Cancelled')
  }

}
