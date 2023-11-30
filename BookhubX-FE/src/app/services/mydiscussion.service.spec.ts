import { TestBed } from '@angular/core/testing';

import { MydiscussionService } from './mydiscussion.service';

describe('MydiscussionService', () => {
  let service: MydiscussionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MydiscussionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
