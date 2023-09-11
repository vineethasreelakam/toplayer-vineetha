import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { LoginLayoutComponent } from './pages/layout/login-layout.component';
import { CoreModule } from './modules/core/core.module';
import { IsLoggedInGuard } from './modules/shared/guards/IsLoggedInGuard';
import { ProfileLayoutComponent } from './pages/layout/profile-layout/profile-layout.component';
import { PublicProfileLayoutComponent } from './pages/layout/public-profile/public-profile.component';
import { WeddingLayoutComponent } from './pages/layout/wedding-layout/wedding-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent, 
    ProfileLayoutComponent,
    PublicProfileLayoutComponent,
    WeddingLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    ToastrModule.forRoot()

  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [IsLoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
