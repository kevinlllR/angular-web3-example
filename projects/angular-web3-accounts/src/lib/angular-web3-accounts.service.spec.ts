import { TestBed } from '@angular/core/testing';

import { AngularWeb3AccountsService } from './angular-web3-accounts.service';

describe('AngularWeb3AccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularWeb3AccountsService = TestBed.get(AngularWeb3AccountsService);
    expect(service).toBeTruthy();
  });
});
