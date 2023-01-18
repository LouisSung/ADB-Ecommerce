import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ActiveElement, Chart, ChartData, ChartEvent, ChartTypeRegistry, LinearScale } from 'chart.js';
import { WordCloudChart } from 'chartjs-chart-wordcloud';
import { NzDateMode } from 'ng-zorro-antd/date-picker';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { lastValueFrom } from 'rxjs';
import { KeywordDto } from '#libs/dto/entity/keyword.dto';

import { default as autocolors } from './chartjs-plugin-autocolors'; // FIXME: official @0.2.1 not yet supported word cloud
import { WordCloudService } from './word-cloud.service';


@Component({
  selector: 'ecommerce-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss'],
})
export class WordCloudComponent implements AfterViewInit {
  @ViewChild('wordCloudCanvas') private wordCloudCanvas?: ElementRef<HTMLCanvasElement>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  @ViewChild('notification', { static: false }) notificationTemplate?: TemplateRef<{}>;

  readonly wordCloudOptions = ['By Order', 'By Product'];

  public wordCloudOption = 1;

  public readonly presetDateRanges = {
    Q1_2011: [new Date(2011, 0, 1), new Date(2011, 4, 0)],
    Q2_2011: [new Date(2011, 3, 1), new Date(2011, 7, 0)],
    Q3_2011: [new Date(2011, 6, 1), new Date(2011, 10, 0)],
    Q4_2011: [new Date(2011, 9, 1), new Date(2011, 13, 0)],
    Q1_2012: [new Date(2012, 0, 1), new Date(2012, 4, 0)],
    Q2_2012: [new Date(2012, 3, 1), new Date(2012, 7, 0)],
  };

  public dateMode: NzDateMode = 'month';

  public dateRange = [this.presetDateRanges.Q1_2011[0], this.presetDateRanges.Q2_2012[1]];

  public limit = 200;

  private wordCloudChart?: WordCloudChart;

  private keywordRawData: KeywordRawData = { byOrder: [], byProduct: [], byOrderDate: [] };

  constructor(private readonly wordCloudService: WordCloudService, private notificationService: NzNotificationService) {
    Chart.register(LinearScale);
  }

  async ngAfterViewInit() {
    await this.queryWordCloudRawData();
    this.renderWordCloud();
  }

  private async queryWordCloudRawData(): Promise<void> {
    this.keywordRawData.byOrder = (await lastValueFrom(this.wordCloudService.getKeywordRawData({
      limit: this.limit, order_by: 'occurrence_order'
    }))).items;
    this.keywordRawData.byProduct = (await lastValueFrom(this.wordCloudService.getKeywordRawData({
      limit: this.limit, order_by: 'occurrence_product'
    }))).items;
    this.keywordRawData.byOrderDate = [...this.keywordRawData.byProduct];
  }

  public renderWordCloud(): void {
    const targetWordCloud: keyof KeywordRawData = this.wordCloudOption === 1 ? 'byProduct'
      : this.wordCloudOption === -1 ? 'byOrderDate' : 'byOrder';
    const targetOrderBy = this.wordCloudOption === 1 ? 'occurrence_product' : 'occurrence_order';
    const wordRawData = this.keywordRawData[targetWordCloud]
      .map((record) => ({ key: record.keyword, value: record[targetOrderBy] }))
      .sort((a, b) => b.value - a.value); // desc sort so the rank = index
    const scalingFactor = wordRawData[0].value / (this.wordCloudOption === -1 ? 50 : 200);
    const datasetOptions: WordCloudDatasetOptions = { rotationSteps: 3, hoverColor: 'red' };
    const data: WordChartData = {
      labels: wordRawData.map(({ key }) => key),
      datasets: [{ ...datasetOptions, data: wordRawData.map(({ value }) => value / scalingFactor) }],
    };
    console.log(targetWordCloud, targetOrderBy, data);
    const canvasCtx = this.wordCloudCanvas?.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    const { onWordClick: onClick, onWordHover: onHover } = this;
    this.wordCloudChart?.destroy();
    this.wordCloudChart = new WordCloudChart(canvasCtx, { data, options: { onClick, onHover }, plugins: [autocolors] });
  }

  public async renderProductWordCloudWithDateRange(): Promise<void> {
    this.wordCloudOption = 1; // set selection
    this.keywordRawData.byOrderDate = (await lastValueFrom(this.wordCloudService.getKeywordProductDataWithDateRange({
      limit: this.limit, start_date: this.dateRange[0].toISOString(), end_date: this.dateRange[1].toISOString()
    }))).items;
    setTimeout(() => {
      this.wordCloudOption = -1; // flag and disable segmented
      this.renderWordCloud();
    })
  }

  public onDatePick(dateRange: [Date, Date]) {
    let startDate = dateRange[0] ?? new Date(2011, 1);
    let endDate = dateRange[1] ?? new Date(2012, 7, 0);
    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    if (this.dateMode === 'month') {
      startDate.setDate(1);
      endDate.setDate(0);
    }
    this.dateRange = [startDate, endDate];
  }

  private onWordClick: WordEventCallback = (event, elements): void => {
    const wordActiveElement = elements[0]?.element as unknown as WordActiveElement;
    if (wordActiveElement) {
      const { text: keyword, index: rank } = wordActiveElement;
      const msg = `Keyword: '${ keyword }', Rank: ${ rank + 1 }`;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.notificationService.template(this.notificationTemplate!, { nzData: { msg, keyword } });
    }
  }

  private onWordHover: WordEventCallback = (event, elements): void => {
    const canvasElement = event.native?.target as HTMLCanvasElement;
    canvasElement.style.cursor = elements[0] ? 'pointer' : 'default';
  }
}


// interfaces
type WordChartData = ChartData<'wordCloud', Array<number>, string>;
type WordEventCallback = (event: ChartEvent, elements: ActiveElement[], chart: Chart) => void;
export type KeywordRawData = Record<'byOrder' | 'byProduct' | 'byOrderDate', Array<KeywordDto>>;
type WordCloudDatasetOptions = Partial<ChartTypeRegistry['wordCloud']['datasetOptions']>;

interface WordActiveElement extends ActiveElement {
  index: number,
  text: string,
  $context: { raw: number, type: 'data' | string }
}
