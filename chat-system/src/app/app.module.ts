import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

import { GroupComponent } from './group/group.component';
import { RolePermissionsService } from './services/role-permissions.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketioService } from './services/socketio.service';
import {CommonModule} from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChannelComponent } from './channel/channel.component';
import { UserDataService } from './services/user-data.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    GroupComponent,
    SidenavComponent,
    ChannelComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    HttpClientModule
    
    
    
  ],
  providers: [RolePermissionsService, SocketioService, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
