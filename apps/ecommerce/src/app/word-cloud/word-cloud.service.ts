import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { Observable } from 'rxjs';
import { KeywordDto } from '#libs/dto/entity/keyword.dto';



@Injectable({ providedIn: 'root' })
export class WordCloudService {
  constructor(private http: HttpClient) {
  }

  getKeywordRawData(params?: { limit?: number, order_by: keyof KeywordDto }): Observable<Pagination<KeywordDto>> {
    return this.http.get<Pagination<KeywordDto>>(`api/keyword`, { params });
  }

  getKeywordProductDataWithDateRange(params: { limit?: number, start_date: string, end_date: string }): Observable<Pagination<KeywordDto>> {
    return this.http.get<Pagination<KeywordDto>>(`api/keyword/range`, { params });
  }
}
