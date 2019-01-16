import { TestBed, inject } from '@angular/core/testing';

import { LoginInService } from './login-in.service';

describe('LoginInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginInService]
    });
  });

  it('should be created', inject([LoginInService], (service: LoginInService) => {
    expect(service).toBeTruthy();
  }));
});
