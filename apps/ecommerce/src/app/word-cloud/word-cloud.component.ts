import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActiveElement, Chart, ChartData, ChartEvent, ChartTypeRegistry, LinearScale } from 'chart.js';
import { WordCloudChart } from 'chartjs-chart-wordcloud';

import { default as autocolors } from './chartjs-plugin-autocolors'; // FIXME: official @0.2.1 not yet supported word cloud


@Component({
  selector: 'ecommerce-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss'],
})
export class WordCloudComponent implements AfterViewInit {
  @ViewChild('wordCloudCanvas') private wordCloudCanvas?: ElementRef<HTMLCanvasElement>;

  private wordCloudChart?: WordCloudChart;

  private wordRawData: WordRawData = [];

  constructor() {
    Chart.register(LinearScale);
    // FIXME: random generated data, should move to service
    this.wordRawData = Array.from({ length: 70 }, () => ({
      key: (Math.random()).toString(36).replace(/[.0-9]/ug, '').substring(0, Math.random() * 10 + 3),
      value: Math.floor(10 + Math.random() * 90)
    }));
  }

  public ngAfterViewInit(): void {
    this.renderWordCloud();
  }

  private renderWordCloud(): void {
    this.wordRawData = this.wordRawData.sort((a, b) => b.value - a.value); // desc sort so the rank = index
    const datasetOptions: WordCloudDatasetOptions = { rotationSteps: 3, hoverColor: 'red' };
    const data: WordChartData = {
      labels: this.wordRawData.map(({ key }) => key),
      datasets: [{ ...datasetOptions, data: this.wordRawData.map(({ value }) => value) }],
    };
    const canvasCtx = this.wordCloudCanvas?.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    const { onWordClick: onClick, onWordHover: onHover } = this;
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
type WordRawData = Array<{ key: string, value: number }>;
type WordCloudDatasetOptions = Partial<ChartTypeRegistry['wordCloud']['datasetOptions']>;

interface WordActiveElement extends ActiveElement {
  index: number,
  text: string,
  $context: { raw: number, type: 'data' | string }
}
