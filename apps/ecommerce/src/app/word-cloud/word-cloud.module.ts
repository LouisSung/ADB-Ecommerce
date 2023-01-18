import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { WordCloudComponent } from './word-cloud.component';
import { FloatingPanelModule } from '../floating-panel/floating-panel.module';
import { RouterLink, RouterLinkActive } from '@angular/router';


@NgModule({
  declarations: [WordCloudComponent],
  imports: [
    CommonModule, FloatingPanelModule, FormsModule,
    NzSegmentedModule, NzButtonModule, NzDatePickerModule, NzDividerModule, NzIconModule,
    NzInputNumberModule, NzNotificationModule, NzSelectModule, NzSpaceModule, RouterLink, RouterLinkActive
  ],
  exports: [WordCloudComponent]
})
export class WordCloudModule {}
