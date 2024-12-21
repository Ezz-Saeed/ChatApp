import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MemberListComponent } from './Components/member-list/member-list.component';
import { MemberDetailsComponent } from './Components/member-details/member-details.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'members',component:MemberListComponent,canActivate:[authGuard],pathMatch:'full'},
  {path:'members/:id',component:MemberDetailsComponent},
  {path:'lists',component:ListsComponent},
  {path:'messages',component:MessagesComponent},
  {path:'**',component:HomeComponent,pathMatch:'full'},
];
