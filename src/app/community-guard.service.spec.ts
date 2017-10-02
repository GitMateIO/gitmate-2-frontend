import { TestBed, inject } from '@angular/core/testing';

import { CommunityGuardService } from './community-guard.service';

describe('CommunityGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunityGuardService]
    });
  });

  it('should be created', inject([CommunityGuardService], (service: CommunityGuardService) => {
    expect(service).toBeTruthy();
  }));
});
