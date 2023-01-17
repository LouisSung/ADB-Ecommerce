import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NodeOptions } from 'vis-network/declarations/network/Network';
import { auth, driver, Driver } from 'neo4j-driver';
import { LabelConfig, NeoVis, NEOVIS_ADVANCED_CONFIG, NeovisConfig, objectToTitleHtml } from 'neovis.js/dist/neovis';


@Injectable({ providedIn: 'root' })
export class NeovisService {
  constructor(private http: HttpClient) {
    this.http.get<Neo4jAuth>('api/neo4j/auth').subscribe(({ url, username, password }) => {
      this.neo4jDrive = driver(url, auth.basic(username, password));
    });
  }

  private static labelConfig = {
    // XXX: forced cast as undefined to fit function type check
    [NEOVIS_ADVANCED_CONFIG]: {
      function: {
        color: NeovisService.lookupColor as unknown as undefined,
        value: NeovisService.lookupNodeSize as unknown as undefined,
        title: objectToTitleHtml as unknown as undefined,
      }
    }
  };

  public static readonly visConfig: NeovisConfig['visConfig'] = {
    nodes: { shape: 'dot' },
    edges: { arrows: { to: { enabled: true } } }
  };

  public static readonly labels: labelConfigs = {
    Cancel: { label: 'cancel_reason', ...NeovisService.labelConfig },
    Order: { label: 'rs_id', ...NeovisService.labelConfig },
    Product: { label: 'product_name', ...NeovisService.labelConfig },
    Return: { label: 'return_reason', ...NeovisService.labelConfig },
    Storage: { label: 'warehouse', ...NeovisService.labelConfig },
    Shipment: { label: 'sl_id', ...NeovisService.labelConfig },
    Supplier: { label: 'supplier_name', ...NeovisService.labelConfig },
    Keyword: { label: 'keyword', ...NeovisService.labelConfig }
  };

  public static readonly relationships: NeovisConfig['relationships'] = {
    CONTAINS: { label: 'label' },
    IS_CANCELED_BY: { label: 'label' },
    IS_RETURNED_BY: { label: 'label' },
    IS_SHIPPED_BY: { label: 'label' },
    IS_SUPPLIED_BY: { label: 'label' },
    STORES: { label: 'label' },
    IS_IN: { label: 'label' }
  };

  private neo4jDrive?: Driver;

  private static lookupColor({ labels }: { labels?: Array<NodeLabel> }): Color {
    const color = {
      blue: { background: '#8BACE8', border: '#386EE1', highlight: { background: '#8BACE8', border: '#386EE1' } },
      green: { background: '#C4F5B8', border: '#62CA43', highlight: { background: '#C4F5B8', border: '#62CA43' } },
      magenta: { background: '#DB7DEE', border: '#CD43E8', highlight: { background: '#DB7DEE', border: '#CD43E8' } },
      orange: { background: '#F3A529', border: '#B2791D', highlight: { background: '#F3A529', border: '#B2791D' } },
      pink: { background: '#F6BDC4', border: '#EB646C', highlight: { background: '#F6BDC4', border: '#EB646C' } },
      purple: { background: '#9E7EDC', border: '#6A30E7', highlight: { background: '#9E7EDC', border: '#6A30E7' } },
      red: { background: '#D93A13', border: '#83230C', highlight: { background: '#D93A13', border: '#83230C' } },
      yellow: { background: '#FFFE3B', border: '#F3A327', highlight: { background: '#FFFE3B', border: '#F3A327' } },
    }
    const colorLookupTable: Record<NodeLabel, Color> = {
      Cancel: color.yellow,
      Order: color.blue,
      Product: color.green,
      Return: color.orange,
      Shipment: color.purple,
      Storage: color.pink,
      Supplier: color.magenta,
      Keyword: color.red,
    };
    const label = labels?.[0];
    return label ? colorLookupTable[label] : undefined;
  }

  private static lookupNodeSize({ labels }: { labels?: Array<NodeLabel> }): number {
    const sizeLookupTable: Record<NodeLabel, number> = {
      Cancel: 3,
      Order: 1,
      Product: 4,
      Return: 3,
      Shipment: 2,
      Storage: 3,
      Supplier: 2,
      Keyword: 10,
    };
    const label = labels?.[0];
    return label ? sizeLookupTable[label] : 1;
  }

  genNeovisInstance({ containerId, initialCypher, visConfig, labels, relationships }: NeovisConfig): NeoVis {
    const { neo4jDrive: neo4j } = this;
    visConfig = visConfig ?? NeovisService.visConfig;
    labels = labels ?? NeovisService.labels;
    relationships = relationships ?? NeovisService.relationships;
    return new NeoVis({ containerId, neo4j, visConfig, labels, relationships, initialCypher });
  }
}


// interfaces
type Color = NodeOptions['color'];
type labelConfigs = Record<NodeLabel, LabelConfig>;
export type NodeLabel = 'Cancel' | 'Order' | 'Product' | 'Return' | 'Shipment' | 'Storage' | 'Supplier' | 'Keyword';

interface Neo4jAuth {
  url: string;
  username: string;
  password: string;
}
