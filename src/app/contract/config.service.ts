import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, Config, defaultCreateContract, CreateContract, defaultConfig } from 'angular-web3-contract';

@Injectable()
export class ConfigService {
  private config: Partial<Config>;
  private contract: Partial<CreateContract>;

  constructor(@Inject(APP_CONFIG) appConfig: Partial<Config>) {

    this.config = Object.assign({}, defaultConfig, appConfig);
    this.contract = { ...defaultCreateContract };

  }

  setConfig(config: Partial<Config>) {
    this.config = Object.assign({}, this.config, config);
  }
  setConfigContract(config: Partial<CreateContract>) {
    this.contract = Object.assign({}, this.contract, config);
  }
  getConfig() {
    return this.config;
  }
  getConfigContract() {
    return this.contract;
  }


}
