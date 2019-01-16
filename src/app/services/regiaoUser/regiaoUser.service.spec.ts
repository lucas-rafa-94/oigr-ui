import { TestBed, inject } from '@angular/core/testing';

import { RegiaoUserService } from './regiaoUser.service';

describe('RegiaoUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegiaoUserService]
    });
  });

  it('should be created', inject([RegiaoUserService], (service: RegiaoUserService) => {
    expect(service).toBeTruthy();
  }));
});
