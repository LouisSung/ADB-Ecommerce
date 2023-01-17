import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { FloatingPanelComponent } from './floating-panel.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [FloatingPanelComponent],
  imports: [CommonModule, NzButtonModule, NzPopoverModule, NzIconModule],
  exports: [FloatingPanelComponent]
})
export class FloatingPanelModule {}
