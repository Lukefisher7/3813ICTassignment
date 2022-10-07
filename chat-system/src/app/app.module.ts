import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupComponent } from './group/group.component';
import { RolePermissionsService } from './role-permissions.service';
import { UserlistComponent } from './userlist/userlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAccordion } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { SocketioService } from './socketio.service';
import {CommonModule} from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    ChatboxComponent,
    GroupListComponent,
    GroupComponent,
    UserlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule
    
  ],
  providers: [RolePermissionsService, SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
