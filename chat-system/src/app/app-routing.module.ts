import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from "./account/account.component";
import { ChatboxComponent } from "./chatbox/chatbox.component";
import { GroupListComponent } from "./group-list/group-list.component";
import { GroupComponent } from './group/group.component';

const routes: Routes = [{path: "login", component:LoginComponent},{path: "account", component:AccountComponent}, {path: "chatbox", component:ChatboxComponent} , {path: "group-list", component:GroupListComponent}, {path: "group", component:GroupComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
