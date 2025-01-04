import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'app-date-input',
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css'
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label!:string;
  @Input() maxDate!:Date;
  bsConfig!: Partial<BsDatepickerConfig>

  constructor(@Self() public ngControl:NgControl){
    ngControl.valueAccessor = this;
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY'
    }
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control():FormControl{
    return this.ngControl.control as FormControl;
  }

}
