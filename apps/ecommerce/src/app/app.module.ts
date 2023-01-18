import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  ControlOutline, BranchesOutline, DatabaseOutline, IdcardOutline, RetweetOutline, SearchOutline
} from '@ant-design/icons-angular/icons';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphModule } from './graph/graph.module';
import { HomeModule } from './home/home.module';
import { WordCloudModule } from './word-cloud/word-cloud.module';


registerLocaleData(en);
const icons: Array<IconDefinition> = [
  ControlOutline, BranchesOutline, DatabaseOutline, IdcardOutline, RetweetOutline, SearchOutline
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule, BrowserModule, BrowserAnimationsModule, FormsModule,
    HttpClientModule, GraphModule, HomeModule, WordCloudModule,
    NzIconModule.forRoot(icons), NzLayoutModule, NzMenuModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
