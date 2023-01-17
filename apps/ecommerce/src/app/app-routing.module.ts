import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GraphComponent } from './graph/graph.component';
import { HomeComponent } from './home/home.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';


const appRoutes: Routes = [
  { path: 'graph', component: GraphComponent },
  { path: 'home', component: HomeComponent },
  { path: 'word-cloud', component: WordCloudComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
