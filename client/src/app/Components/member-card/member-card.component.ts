import { Component, Input } from '@angular/core';
import { IMember } from '../../Models/member';

@Component({
  selector: 'app-member-card',
  imports: [],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() member!:IMember;

}
