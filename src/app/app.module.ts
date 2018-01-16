import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { ComponentModule } from '@component/component.module';
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
    RouterModule,
    PagesModule,
    ComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
