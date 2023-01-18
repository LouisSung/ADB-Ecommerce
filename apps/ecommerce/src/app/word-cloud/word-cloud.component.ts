import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActiveElement, Chart, ChartData, ChartEvent, ChartTypeRegistry, LinearScale } from 'chart.js';
import { WordCloudChart } from 'chartjs-chart-wordcloud';
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

  readonly wordCloudOptions = ['By Product', 'By Order'];

  public wordCloudOption = 0;

  public limit = 200;

  private wordCloudChart?: WordCloudChart;

  private keywordRawData: KeywordRawData = { occurrence_product: [], occurrence_order: [] };

  constructor(private readonly wordCloudService: WordCloudService) {
    Chart.register(LinearScale);
  }

  async ngAfterViewInit() {
    for (const targetWordCloud of Object.keys(this.keywordRawData) as Array<keyof KeywordRawData>) {
      this.keywordRawData[targetWordCloud] = (await lastValueFrom(this.wordCloudService.getKeywordRawData({
        limit: this.limit, order_by: targetWordCloud
      }))).items;
    }
    this.renderWordCloud();
  }

  renderWordCloud(): void {
    const targetWordCloud: keyof KeywordDto = this.wordCloudOption === 0 ? 'occurrence_product' : 'occurrence_order';
    const wordRawData = this.keywordRawData[targetWordCloud]
      .map((record) => ({ key: record.keyword, value: record[targetWordCloud] }))
      .sort((a, b) => b.value - a.value); // desc sort so the rank = index
    const scalingFunc = (value: number, factor = wordRawData[0].value / 200) => (value / factor);
    const datasetOptions: WordCloudDatasetOptions = { rotationSteps: 3, hoverColor: 'red' };
    const data: WordChartData = {
      labels: wordRawData.map(({ key }) => key),
      datasets: [{ ...datasetOptions, data: wordRawData.map(({ value }) => scalingFunc(value)) }],
    };
    const canvasCtx = this.wordCloudCanvas?.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    const { onWordClick: onClick, onWordHover: onHover } = this;
    this.wordCloudChart?.destroy();
    this.wordCloudChart = new WordCloudChart(canvasCtx, { data, options: { onClick, onHover }, plugins: [autocolors] });
  }

  private onWordClick: WordEventCallback = (event, elements): void => {
    const wordActiveElement = elements[0]?.element as unknown as WordActiveElement;
    if (wordActiveElement) {
      const { text, $context: { raw: value }, index: rank } = wordActiveElement;
      console.warn(`clicked word '${ text }' (occurrence: ${ value }, rank: ${ rank + 1 })`);
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
export type KeywordRawData = { occurrence_product: Array<KeywordDto>, occurrence_order: Array<KeywordDto> };
type WordCloudDatasetOptions = Partial<ChartTypeRegistry['wordCloud']['datasetOptions']>;

interface WordActiveElement extends ActiveElement {
  index: number,
  text: string,
  $context: { raw: number, type: 'data' | string }
}
