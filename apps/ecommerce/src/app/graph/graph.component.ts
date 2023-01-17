import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Node, NeoVis, NeoVisEvents } from 'neovis.js/dist/neovis'; // with dependencies
import { lastValueFrom } from 'rxjs';

import { GraphService } from './graph.service';
import { NeovisService, NodeLabel } from '../neovis/neovis.service';


@Component({
  selector: 'ecommerce-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit {
  constructor(private readonly graphService: GraphService, private readonly novisService: NeovisService) {
  }

  protected segmentedOption = 0;

  protected segmentedOptions: NzSegmentedOptions = [
    { label: 'Query', value: 'Query', icon: 'database' },
    { label: 'Label', value: 'Label', icon: 'idcard' },
    { label: 'Node', value: 'Node', icon: 'branches' }
  ];

  protected labelOptionsG1: Array<NzCheckBoxOptionInterface> = [
    { label: 'Cancel', value: 'Cancel', checked: true },
    { label: 'Order', value: 'Order', checked: true },
    { label: 'Product', value: 'Product', checked: true },
    { label: 'Return', value: 'Return', checked: true }
  ];
  protected labelOptionsG2: Array<NzCheckBoxOptionInterface> = [
    { label: 'Shipment', value: 'Shipment', checked: true },
    { label: 'Storage', value: 'Storage', checked: true },
    { label: 'Supplier', value: 'Supplier', checked: true },
    { label: 'Keyword', value: 'Keyword', checked: true }
  ];
  protected nodeOptionsG1: Array<NzCheckBoxOptionInterface> = [
    { label: 'Cancel', value: 'Cancel', checked: true },
    { label: 'Order', value: 'Order', checked: true },
    { label: 'Return', value: 'Return', checked: true }
  ];
  protected nodeOptionsG2: Array<NzCheckBoxOptionInterface> = [
    { label: 'Shipment', value: 'Shipment', checked: true },
    { label: 'Storage', value: 'Storage', checked: true },
    { label: 'Supplier', value: 'Supplier', checked: true }
  ];

  @ViewChild('neovis') private neovisRef: ElementRef<HTMLDivElement>;

  public keyword = '上衣';

  public limit = 100;

  public selectedNode?: Node;

  private nodeLabelFlag: Record<NodeLabel, 'show' | 'hide' | ''> = { // '' to disable query, 'hide' to hide label
    Cancel: 'show',
    Order: 'show',
    Product: 'show',
    Return: 'show',
    Shipment: 'show',
    Storage: 'show',
    Supplier: 'show',
    Keyword: 'show'
  }

  private cypher = '';

  private neovis: NeoVis;

  ngAfterViewInit() {
    this.render().catch((err) => console.error(err));
  }

  private onClickNode = ({ node }: { node: Node }) => {
    console.log(node);
    setTimeout(() => this.selectedNode = node, 0); // save selectedNode after clear on click
    this.neovis.stabilize();
  }

  private onFetchCompleted({ recordCount }: { recordCount: number }) {
    console.log(`Queried ${ recordCount } records`);
  }

  async render(): Promise<void> {
    const nodeLabelFlag = Object.fromEntries(Object.entries(this.nodeLabelFlag).map(([key, value]) => [key.toLowerCase(), value]));
    const params = { limit: this.limit, ...nodeLabelFlag };
    const labels = { ...NeovisService.labels };
    for (const [nodeLabel, flag] of Object.entries(this.nodeLabelFlag)) {
      if (flag === 'hide') {
        delete labels[nodeLabel as NodeLabel].label;
      }
    }

    this.cypher = (await lastValueFrom(this.graphService.genKeywordQuery(this.keyword, params))).cypher;
    const { cypher: initialCypher, neovisRef: { nativeElement: { id: containerId } } } = this;
    this.neovis = this.novisService.genNeovisInstance({ containerId, initialCypher, labels });
    this.neovis.render();
    this.neovis.registerOnEvent(<NeoVisEvents>'clickNode', this.onClickNode);
    this.neovis.registerOnEvent(<NeoVisEvents>'completed', this.onFetchCompleted);
  }
}