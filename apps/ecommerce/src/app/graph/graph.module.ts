import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

import { GraphComponent } from './graph.component';
import { FloatingPanelModule } from '../floating-panel/floating-panel.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';


@NgModule({
  declarations: [GraphComponent],
  imports: [CommonModule, FloatingPanelModule, FormsModule, NzSegmentedModule, NzCheckboxModule, NzButtonModule, NzIconModule, NzDividerModule, NzInputNumberModule, NzInputModule],
  exports: [GraphComponent]
})
export class GraphModule {}
