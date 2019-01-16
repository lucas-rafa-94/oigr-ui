import { TestBed, inject } from '@angular/core/testing';

import { EstadosDddService } from './estadosDdd.service';

describe('EstadosDddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadosDddService]
    });
  });

  it('should be created', inject([EstadosDddService], (service: EstadosDddService) => {
    expect(service).toBeTruthy();
  }));
});
