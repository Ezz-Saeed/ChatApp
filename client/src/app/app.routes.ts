import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MemberListComponent } from './Components/member-list/member-list.component';
import { MemberDetailsComponent } from './Components/member-details/member-details.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { authGuard } from './Guards/auth.guard';
import { TestErrorsComponent } from './Components/test-errors/test-errors.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ServerErrorComponent } from './Components/server-error/server-error.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
      {path:'members/:id',component:MemberDetailsComponent},
      {path:'lists',component:ListsComponent},
      {path:'messages',component:MessagesComponent},
      {path:'members',component:MemberListComponent},
    ]
  },
  {path:'error',component:TestErrorsComponent},
  {path:'notFound',component:NotFoundComponent},
  {path:'serverError',component:ServerErrorComponent},

  {path:'**',component:NotFoundComponent,pathMatch:'full'},
];
