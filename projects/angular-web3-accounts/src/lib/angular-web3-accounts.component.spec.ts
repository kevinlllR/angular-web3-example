import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularWeb3AccountsComponent } from './angular-web3-accounts.component';

describe('AngularWeb3AccountsComponent', () => {
  let component: AngularWeb3AccountsComponent;
  let fixture: ComponentFixture<AngularWeb3AccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularWeb3AccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularWeb3AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
