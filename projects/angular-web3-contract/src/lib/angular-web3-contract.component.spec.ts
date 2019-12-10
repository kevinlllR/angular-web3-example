import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularWeb3ContractComponent } from './angular-web3-contract.component';

describe('AngularWeb3ContractComponent', () => {
  let component: AngularWeb3ContractComponent;
  let fixture: ComponentFixture<AngularWeb3ContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularWeb3ContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularWeb3ContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
