import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwitterStreamModule } from './twitter-stream/twitter-stream.module';
import { NgReduxModule } from '@angular-redux/store';
import { ServicesModule } from './services/services.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [ AppComponent  ],
  imports: [
    BrowserModule, NgReduxModule, BrowserAnimationsModule,
    AppRoutingModule, TwitterStreamModule, ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
