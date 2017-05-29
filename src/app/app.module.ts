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
import { MdIconModule  } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdProgressSpinnerModule } from '@angular/material';
import { MdAutocompleteModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';

import { HotkeyModule } from 'angular2-hotkeys';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { ApiService } from './api/api.service';

import { HomeViewComponent } from './home-view/home-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { RepositoriesViewComponent } from './repositories-view/repositories-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { PluginsComponent } from './plugins/plugins.component';
import { RepositoryComponent } from './repository/repository.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeViewComponent},
  {path: 'profile', component: ProfileViewComponent},
  {path: 'repositories', component: RepositoriesViewComponent},
  {path: 'repo/:id', component: PluginsComponent},
  {path: 'disclaimer', component: DisclaimerComponent},
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
    DisclaimerComponent
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
    HotkeyModule.forRoot(),
  ],
  providers: [
    ApiService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
