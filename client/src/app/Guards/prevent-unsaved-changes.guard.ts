import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../Components/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> =
(component, currentRoute, currentState, nextState) => {
  // component:MemberEditComponent;
  if(component.editForm.dirty){
    return confirm('Are you sure you want to continue ? Any changes will be unsaved')
  }
  return true;
};
