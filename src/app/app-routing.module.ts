import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageNotFoundComponent } from './modules/shared/components/error-page-not-found/error-page-not-found.component';
import { ContentComponent } from './modules/shared/components/layout/content/content.component';
import { IsLoggedInGuard } from './modules/shared/guards/IsLoggedInGuard';
import { LoginLayoutComponent } from './pages/layout/login-layout.component';
import { ProfileLayoutComponent } from './pages/layout/profile-layout/profile-layout.component';
import { PublicProfileLayoutComponent } from './pages/layout/public-profile/public-profile.component';
import { WeddingLayoutComponent } from './pages/layout/wedding-layout/wedding-layout.component';

const routes: Routes = [
  {
    path: ':id',
    component: PublicProfileLayoutComponent,
    // path:'',
    // loadChildren: async () => (await import('./modules/public/public.module')).PublicModule,
    // canActivate: [IsLoggedInGuard]
   },
  {
    path: 'user',
    component: LoginLayoutComponent,
    loadChildren: async () => (await import('./modules/login/login.module')).LoginModule,
    // canActivate: [IsLoggedInGuard]
   },
   {
    path: 'user',
    component: ContentComponent ,
    loadChildren: async () => (await import('./modules/plan/plan.module')).PlanModule
   },
   {
    path: 'user',
    component: ContentComponent ,
    loadChildren: async () => (await import('./modules/account/account.module')).AccountModule
   },
   {
    path: 'user',
    component: ContentComponent ,
    loadChildren: async () => (await import('./modules/dashboard/dashboad.module')).DashboardModule
   },
   {
    path: 'user',
    component: ContentComponent ,
    loadChildren: async () => (await import('./modules/profile/profile.module')).ProfileModule
   },
   {
    path: 'user',
    component: ProfileLayoutComponent,
    loadChildren: async () => (await import('./modules/my-profile/myProfile.module')).MyProfileModule,
    // canActivate: [IsLoggedInGuard]
   },
  //  {
  //   path: 'my-event/:id',
  //   component: ProfileLayoutComponent,
  //   loadChildren: async () => (await import('./modules/my-profile/myProfile.module')).MyProfileModule,
  //   // canActivate: [IsLoggedInGuard]
  //  },
   {
    path: 'user',
    component: ContentComponent ,
    loadChildren: async () => (await import('./modules/connect/connect.module')).ConnectModule
   },
   {
    path: 'user',
    component: ContentComponent ,
    loadChildren: async () => (await import('./modules/events/event.module')).EventModule
   },
   {
    path: 'user',
    component: ContentComponent ,
    loadChildren: async () => (await import('./modules/wedding/wedding.module')).WeddingModule
   },
   {
    path: 'user',
    component: WeddingLayoutComponent ,
    loadChildren: async () => (await import('./modules/wedding-templates/wedding-template.module')).WeddingTemplateModule
   },
   {
    path: '**', pathMatch: 'full', 
    component: ErrorPageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
