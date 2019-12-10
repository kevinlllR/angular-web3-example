import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractService } from './contract.service';

import {ConfigService} from 'angular-web3-contract';
import {APP_CONFIG } from 'angular-web3-contract';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: []
})
export class ChildModule {

  static forRoot(config: any): ModuleWithProviders {


    return {
      ngModule: ChildModule,
      providers: [
        { provide: APP_CONFIG, useValue: config },
        {provide: ContractService, useClass: ContractService},
        {provide: ConfigService, useClass: ConfigService},


      ]
    };
  }
}
