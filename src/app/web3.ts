import { InjectionToken } from '@angular/core';

declare var Web3: any;

export const WEB3 = new InjectionToken<any>('web3', {
  providedIn: 'root',
  factory: () => {
    try {
      const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
      return new Web3(provider);
    } catch (err) {
      // throw new Error('Non-Ethereum browser detected. You should consider trying Mist or MetaMask!');
      return null;
    }
  }
});
