import { AngularWeb3ContractComponent } from './angular-web3-contract.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ContractService } from './angular-web3-contract.service';
import { ConfigService } from './config.service';
import { APP_CONFIG, Config } from './config';

@NgModule({
  declarations: [AngularWeb3ContractComponent],
  imports: [
  ],
  exports: [AngularWeb3ContractComponent]
})

export class AngularWeb3ContractModule {

  static forRoot(config: Partial<Config>): ModuleWithProviders {
    try {
      if ((config.contract.doc as any).abi && (config.contract.doc as any).bytecode) {
        return {
          ngModule: AngularWeb3ContractModule,
          providers: [
            { provide: APP_CONFIG, useValue: config },
            { provide: ContractService, useClass: ContractService },
            { provide: ConfigService, useClass: ConfigService },


          ]
        };
      }
      throw new Error('Configuration Invalid');


    } catch (e) {
         throw new Error('Configuration Invalid');

    }

  }
}
