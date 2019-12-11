import { Injectable,  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from 'angular-web3-contract';
import { CreateContract, Config } from 'angular-web3-contract';
let Web3: any;
@Injectable()
export class ContractService {
  private contract: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  $contract: any = this.contract.asObservable();
  private status: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  $status: any = this.status.asObservable();
  selectContract = null;
  methods: Array<any> = [];
  events: Array<any> = [];
  web3: any;
  constructor(private config: ConfigService) {

    if (!window['Web3']) {
      this.injectScript();
    } else {
      this.generateProvider();
    }
    this.$status.subscribe(ok => {
      switch (ok) {
        case 0: {
          break;
        }
        case 1: {
          this.initContract();
          break;
        }
        case 2: {
          break;
        }
      }
    });
  }

  initContract() {
    const config = this.config.getConfig();

    if (config.contract.address) {
      this.selectContract = new this.web3.eth.Contract(
        (config.contract.doc as any).abi,
        config.contract.address
      );
    } else {
      this.selectContract = new this.web3.eth.Contract((config.contract.doc as any).abi);
    }
    this.contract.next(this.selectContract);
  }
  getContract() {
    return this.selectContract;
  }

  useContract(address) {

    return this.generateContract(address);
  }
  async generateContract(address = null) {
    this.selectContract = new this.web3.eth.Contract(
      (this.config.getConfig().contract.doc as any).abi,
      address
    );
    this.contract.next(this.selectContract);

    return this.selectContract;
  }
  async deployContract(args, options = {}) {

    try {
      const configC: Partial<CreateContract> = this.config.getConfigContract();
      const config: Partial<Config> = this.config.getConfig();
      const gasPrice = configC.transaction.gasPrice
        ? configC.transaction.gasPrice
        : await this.web3.eth.getGasPrice();
      const nonce = await this.web3.eth.getTransactionCount(
        config.public_key,
        'pending'
      );
      const tempData = (config.contract.doc as any).bytecode;
      const handle = this.selectContract.deploy({
        data: tempData,
        arguments: args.slice()
      });
      const gas = configC.transaction.gas
        ? configC.transaction.gas
        : await handle.estimateGas({ from: config.public_key });

      const rawTx = {
        nonce,
        gas,
        from: config.public_key,
        gasPrice,
        to: configC.transaction.to,
        chainId: config.network,
        data: handle.encodeABI()
      };
      const signTransaction = await this.web3.eth.accounts.signTransaction(
        rawTx,
        config.private_key
      );
      const status = await this.web3.eth.sendSignedTransaction(
        signTransaction.rawTransaction
      );
      const { data, ...temp } = rawTx;
      const form = {
        transaction: temp
      };
      console.log('Se hizo')
      this.config.setConfigContract(data);
      // const result2 = await this.web3.eth.getTransactionFromBlock(status.transactionHash);
      return status;
    } catch (e) {
      throw new Error(e);
    }
  }
  async executeMethod(name, args) {
    const config = this.config.getConfig();
    const gasPrice = await this.web3.eth.getGasPrice();
    const data = this.selectContract.methods[name](...args);
    const encode = data.encodeABI();
    const nonce = await this.web3.eth.getTransactionCount(
      config.public_key,
      'pending'
    );
    const rawTx: any = {
      nonce,
      gasPrice,
      gasLimit: this.web3.utils.toHex('300000'),
      to: this.selectContract.options.address,
      from: config.public_key,
      value: this.web3.utils.toHex(this.web3.utils.toWei('0', 'ether')),
      chainId: config.network,
      data: encode
    };
    const gas = await data.estimateGas(rawTx);
    rawTx['gas'] = gas;

    const signTransaction = await this.web3.eth.accounts.signTransaction(
      rawTx,
      config.private_key
    );

    const result = await this.web3.eth.sendSignedTransaction(
      signTransaction.rawTransaction
    );
    // const result2 = await this.web3.getTransactionFromBlock(result.transactionHash);
    return result;
  }
  getMethods() {
    const config = this.config.getConfig();
    this.methods = (config.contract.doc as any).abi.reduce((acc, actual) => {
      if (actual.type === 'function') {
        acc.push(actual);
      }
      return acc;
    }, []);
    return this.methods;
  }
  getEvents() {
    const config = this.config.getConfig();

    this.events = (config.contract.doc as any).abi.reduce((acc, actual) => {
      if (actual.type === 'event') {
        acc.push(actual);
      }
      return acc;
    }, []);
    return this.events;
  }


  injectScript() {
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.35/dist/web3.js';
    script.async = true;

    script.onload = this.onSuccess.bind(this);

    script.onerror = this.onError.bind(this);

    document.head.appendChild(script);
  }
  onSuccess() {
    this.generateProvider();
    this.status.next(1);
  }
  generateProvider() {
    Web3 = window['Web3'];
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(this.config.getConfig().url)
    );
  }
  onError() {
    console.error('web3 error injected');
    this.status.next(2);
  }

  reload() {
    this.injectScript();
  }
}
