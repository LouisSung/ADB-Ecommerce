import { Component, Input } from '@angular/core';


@Component({
  selector: 'ecommerce-floating-panel',
  templateUrl: './floating-panel.component.html',
  styleUrls: ['./floating-panel.component.scss'],
})
export class FloatingPanelComponent {
  @Input() protected panelTitle = 'Control Panel';
  protected visible = false;
}
