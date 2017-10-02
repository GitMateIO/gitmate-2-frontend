import { TestBed, inject } from '@angular/core/testing';

import { EnterpriseGuardService } from './enterprise-guard.service';

describe('EnterpriseGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterpriseGuardService]
    });
  });

  it('should be created', inject([EnterpriseGuardService], (service: EnterpriseGuardService) => {
    expect(service).toBeTruthy();
  }));
});
