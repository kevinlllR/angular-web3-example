import { TestBed } from '@angular/core/testing';

import { AngularWeb3ContractService } from './angular-web3-contract.service';

describe('AngularWeb3ContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularWeb3ContractService = TestBed.get(AngularWeb3ContractService);
    expect(service).toBeTruthy();
  });
});
