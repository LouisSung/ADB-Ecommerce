import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { WordCloudModule } from './word-cloud/word-cloud.module';


@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, HomeModule, WordCloudModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
