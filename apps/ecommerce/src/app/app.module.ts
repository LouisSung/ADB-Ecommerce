import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphModule } from './graph/graph.module';
import { HomeModule } from './home/home.module';
import { WordCloudModule } from './word-cloud/word-cloud.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule, BrowserModule, BrowserAnimationsModule, FormsModule,
    HttpClientModule, GraphModule, HomeModule, WordCloudModule,
    NzLayoutModule, NzMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
