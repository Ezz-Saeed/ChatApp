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
import { MemberEditComponent } from './Components/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './Guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './Resolvers/member-detailed.resolver';
import { AdminPanelComponent } from './Components/Admin/admin-panel/admin-panel.component';
import { adminGuard } from './Guards/admin.guard';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
      {path:'members/:username',component:MemberDetailsComponent,
        resolve:{member:MemberDetailedResolver}},
      {path:'member/edit',component:MemberEditComponent,canDeactivate:[preventUnsavedChangesGuard]},
      {path:'lists',component:ListsComponent},
      {path:'messages',component:MessagesComponent},
      {path:'members',component:MemberListComponent},
      {path:'admin',component:AdminPanelComponent, canActivate:[adminGuard]},
    ]
  },
  {path:'error',component:TestErrorsComponent},
  {path:'notFound',component:NotFoundComponent},
  {path:'serverError',component:ServerErrorComponent},

  {path:'**',component:NotFoundComponent,pathMatch:'full'},
];
