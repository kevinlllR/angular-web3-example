import { InjectionToken } from '@angular/core';
export interface Config {
  contract: {
    doc: object,
    address?: string
  };
  url: string;
  network?: number;
  public_key: string;
  private_key: string;
}
export interface CreateContract {
  name: string;
  symbol: string;
  decimal: number;
  transaction: {
      nonce: string,
      gas: string,
      from: string
      gasPrice: string,
      to: any,
      chainId: number,
      data?: string
  };
}
export const defaultCreateContract: Partial<CreateContract> = {
  name: 'Test',
  symbol: 'T',
  decimal: 18,
  transaction: {
      nonce: '',
      gas: '',
      from: '',
      gasPrice: '',
      to: 0x0,
      chainId: 3,
      data: ''
  }
};
export const defaultConfig: Partial<Config> = {
  network: 3
};

export const APP_CONFIG = new InjectionToken<Config>('app.config');
