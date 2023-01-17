import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NodeLabel } from '../neovis/neovis.service';


@Injectable({ providedIn: 'root' })
export class GraphService {
  constructor(private http: HttpClient) {
  }

  genKeywordQuery(keyword: string, params?: { limit?: number }): Observable<{ cypher: string }> {
    return this.http.get<{ cypher: string }>(`api/neo4j/keyword/${ keyword }`, { params });
  }

  genInspectionQuery(label: NodeLabel, properties: Record<string, string | number>) {
    return this.http.get<{ cypher: string }>(`api/neo4j/inspection/${ label }`, { params: properties });
  }
}
