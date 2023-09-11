import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularSvgIconModule } from 'angular-svg-icon';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { DragulaModule } from 'ng2-dragula';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { ExportAsModule } from 'ngx-export-as';

import { ContentComponent } from './components/layout/content/content.component';
import { HeaderComponent } from './components/header/header/header.component';
import { NavService } from './services/nav.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FeatherIconComponent } from './components/feather-icon/feather-icon.component';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { ColorComponent } from './components/customizer/color/color.component';
import { LayoutSettingComponent } from './components/customizer/layout-setting/layout-setting.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountComponent } from './components/header/header/account/account.component';
import { ModeComponent } from './components/header/header/mode/mode.component';
import { MaximizeComponent } from './components/header/header/maximize/maximize.component';
import { NotificationComponent } from './components/header/header/notification/notification.component';
import { ToastrControlService } from './services/toastr.service';
import { ErrorPageNotFoundComponent } from './components/error-page-not-found/error-page-not-found.component';
import { SharedService } from './services/shared.service';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { LoaderComponent } from './components/loader/loader.component';
// import { AddLinkComponent } from './components/add-link/add-link.component';
import { AddThumbnailComponent } from './components/modals/add-thumbnail/add-thumbnail.component';
import { LinkTypesComponent } from './components/link-types/link-types.component';
import { LinkPreviewComponent } from './components/link-preview/link-preview.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { ViewWeddingTemplateComponent } from './components/view-wedding-template/view-wedding-template.component';
import { ViewWeddingTemplateComponent1 } from './components/view-wedding-template1/view-wedding-template1.component';
import { ViewWeddingTemplateComponent2 } from './components/view-wedding-template2/view-wedding-template2.component';
import { PublicProfileComponent } from './components/public/pubilc-profile/public-profile.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';

const modules = [
    FormsModule,
    ReactiveFormsModule,
    // BrowserModule,
    RouterModule,
    NgSelectModule,
    NgbModule,
    AngularSvgIconModule,
    ImageCropperModule,
];
const components = [
    HeaderComponent, 
    ContentComponent,
    SidebarComponent,
    FeatherIconComponent,
    ColorComponent,
    LayoutSettingComponent,
    CustomizerComponent,
    BreadcrumbComponent,
    FooterComponent,
    AccountComponent,
    ModeComponent,
    MaximizeComponent,
    NotificationComponent,
    ErrorPageNotFoundComponent,
    TapToTopComponent,
    LoaderComponent,
    // AddLinkComponent,
    AddThumbnailComponent,
    LinkTypesComponent,
    LinkPreviewComponent,
    QrCodeComponent,
    ViewWeddingTemplateComponent,
    ViewWeddingTemplateComponent1,
    ViewWeddingTemplateComponent2,
    PublicProfileComponent,
    ImageCropperComponent,
];
const providers =[
    NavService,
    ToastrControlService,
    SharedService,
]
@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        ...modules, 
        BsDatepickerModule.forRoot(),
        AngularSvgIconModule.forRoot(), 
        // SweetAlert2Module.forRoot(),
        // OwlDateTimeModule, 
        // OwlNativeDateTimeModule
        // DragulaModule.forRoot(),
    ],
    providers: [...providers],
    exports: [...modules,
        ContentComponent,
        FeatherIconComponent, 
        BreadcrumbComponent,
        FooterComponent,
        AccountComponent,
        ModeComponent,
        MaximizeComponent,
        NotificationComponent,
        TapToTopComponent,
        LoaderComponent,
        // AddLinkComponent,
        LinkPreviewComponent,
        QrCodeComponent,
        ViewWeddingTemplateComponent,
        ViewWeddingTemplateComponent1,
        ViewWeddingTemplateComponent2,
        PublicProfileComponent,
    ],
    // entryComponents: [ViewImageComponent],
})
export class SharedModule { }



// all the modules commonly used are defined here