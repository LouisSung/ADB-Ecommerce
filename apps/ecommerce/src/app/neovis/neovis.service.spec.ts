import { TestBed } from '@angular/core/testing';

import { NeovisService } from './neovis.service';

describe('NeovisService', () => {
  let service: NeovisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeovisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
