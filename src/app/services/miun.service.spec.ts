import { TestBed } from '@angular/core/testing';

import { MiunService } from './miun.service';

describe('MiunService', () => {
  let service: MiunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiunService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
