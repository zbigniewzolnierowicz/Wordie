import { TestBed } from '@angular/core/testing';

import { CardProviderService } from './card-provider.service';

describe('CardProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardProviderService = TestBed.get(CardProviderService);
    expect(service).toBeTruthy();
  });
});
