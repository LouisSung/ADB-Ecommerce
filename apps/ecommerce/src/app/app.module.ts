import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphModule } from './graph/graph.module';
import { HomeModule } from './home/home.module';
import { WordCloudModule } from './word-cloud/word-cloud.module';


@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, GraphModule, HomeModule, WordCloudModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
