import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordCloudComponent } from './word-cloud.component';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';


@NgModule({
  declarations: [WordCloudComponent],
  imports: [CommonModule, NzSegmentedModule],
  exports: [WordCloudComponent]
})
export class WordCloudModule {}
