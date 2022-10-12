import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from "./account/account.component";

import { GroupComponent } from './group/group.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChannelComponent } from './channel/channel.component';

const routes: Routes = [
{path: "login", component:LoginComponent},
{path: "account", component:AccountComponent}, 
{path: "group", component:GroupComponent},
{path: "sidenav", component:SidenavComponent},
{path: "channel", component:ChannelComponent}]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
