import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any= {};
  @Input() usersFromHome:any;
  @Output() cancelRegister = new EventEmitter();

  register(){
    console.log(this.model)
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Cancelled')
  }

}
