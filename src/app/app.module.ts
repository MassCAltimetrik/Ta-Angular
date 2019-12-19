import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatInputModule, MatIconModule, MatDialogModule,MatDialogConfig } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { DialogComponent } from './dialog/dialog.component';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import {DialogService} from './dialog/dialog.service';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionComponent } from './session/session.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BatchComponent } from './batch/batch.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadComponent,
    LogoutComponent,
    RegistrationComponent,
    HomeComponent,
    DialogComponent,
    DialogTemplateComponent,
    AdminComponent,
    SessionComponent,
    FormModalComponent,
    BatchComponent
  ],
  imports: [
    BrowserModule, NgbModule,
    HttpClientModule,
    AppRoutingModule, BrowserAnimationsModule,
    MatInputModule, MatDialogModule, MatButtonModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'upload',
        component: UploadComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'logout',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'session',
        component: SessionComponent
      },
        {
          path: 'batch',
          component: BatchComponent
        }      
    ])
  ],
  providers: [ AuthGuard,DialogService],
  bootstrap: [AppComponent],
  entryComponents: [ DialogTemplateComponent,
                     FormModalComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
