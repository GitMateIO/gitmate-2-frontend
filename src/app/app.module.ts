import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

import { MdButtonModule } from '@angular/material';
import { MdToolbarModule} from '@angular/material';
import { MdMenuModule} from '@angular/material';
import { MdIconModule, MdIconRegistry } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdProgressSpinnerModule } from '@angular/material';
import { MdAutocompleteModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdSnackBarModule } from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdChipsModule} from '@angular/material';

import { HotkeyModule } from 'angular2-hotkeys';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { ApiService } from './api/api.service';
import { EnterpriseGuardService } from './enterprise-guard.service';
import { CommunityGuardService } from './community-guard.service';

import { HomeViewComponent } from './home-view/home-view.component';
import { HomeViewCommunityComponent } from './home-view-community/home-view-community.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { RepositoriesViewComponent } from './repositories-view/repositories-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { PluginsComponent } from './plugins/plugins.component';
import { RepositoryComponent } from './repository/repository.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { DictSettingComponent } from './dict-setting/dict-setting.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SecurityComponent } from './security/security.component';
import { FooterComponent } from './footer/footer.component';
import { SearchSelectComponent } from './search-select/search-select.component';
import { PricingComponent } from './pricing/pricing.component';
import { FeaturesComponent } from './features/features.component';
import { ReportComponent } from './report/report.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeViewComponent, canActivate: [EnterpriseGuardService]},
  {path: 'community', component: HomeViewCommunityComponent, canActivate: [CommunityGuardService]},
  {path: 'security', component: SecurityComponent},
  {path: 'profile', component: ProfileViewComponent},
  {path: 'repositories', component: RepositoriesViewComponent},
  {path: 'repo/:id', component: PluginsComponent},
  {path: 'disclaimer', component: DisclaimerComponent},
  {path: 'security', component: SecurityComponent},
  {path: 'pricing', component: PricingComponent, canActivate: [EnterpriseGuardService]},
  {path: 'features', component: FeaturesComponent},
  {path: 'report/:url', component: ReportComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: NotFoundViewComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeViewComponent,
    ProfileViewComponent,
    RepositoriesViewComponent,
    NotFoundViewComponent,
    PluginsComponent,
    RepositoryComponent,
    SearchbarComponent,
    DisclaimerComponent,
    DictSettingComponent,
    SpinnerComponent,
    SecurityComponent,
    FooterComponent,
    SearchSelectComponent,
    PricingComponent,
    FeaturesComponent,
    HomeViewCommunityComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdCheckboxModule,
    MdSlideToggleModule,
    MdProgressSpinnerModule,
    MdAutocompleteModule,
    MdGridListModule,
    MdSelectModule,
    MdTabsModule,
    MdSnackBarModule,
    MdListModule,
    MdChipsModule,
    HotkeyModule.forRoot(),
  ],
  providers: [
    MdIconRegistry,
    ApiService,
    EnterpriseGuardService,
    CommunityGuardService
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
