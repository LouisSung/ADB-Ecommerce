import { TestBed } from '@angular/core/testing';

import { WordCloudService } from './word-cloud.service';

describe('WordCloudService', () => {
  let service: WordCloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
