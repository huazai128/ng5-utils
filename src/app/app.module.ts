import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { AlineModule } from '@component/index';
import { AclModule } from '@acl/acl.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ThemeModule.forRoot(),
    AclModule.forRoot(),
    AlineModule.forRoot(),
    RouterModule,
    PagesModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
