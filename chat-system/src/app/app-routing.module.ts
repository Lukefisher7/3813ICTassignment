import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from "./account/account.component";
import { ChatboxComponent } from "./chatbox/chatbox.component";
import { GroupComponent } from './group/group.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
{path: "login", component:LoginComponent},
{path: "account", component:AccountComponent}, 
{path: "chatbox", component:ChatboxComponent} , 
{path: "group", component:GroupComponent},
{path: "sidenav", component:SidenavComponent}]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
