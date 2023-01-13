import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordCloudComponent } from './word-cloud.component';


@NgModule({
  declarations: [WordCloudComponent],
  imports: [CommonModule],
  exports: [WordCloudComponent]
})
export class WordCloudModule {}
