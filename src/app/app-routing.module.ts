import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VieweventsComponent } from './viewevents/viewevents.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'viewevents', component:VieweventsComponent},
  {path:'deleteaccount', component:DeleteConfirmComponent},
  {path:'editevent', component:EditEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
