# Example
https://stackblitz.com/edit/angular-web3-contract
# Installation
angular-web3-contract requires [Node.js](https://nodejs.org/) v12+ to run.
### Npm
`npm install -S angular-web3-contract`
# Usage
1.-Import the module
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material.module';
import {AngularWeb3ContractModule} from 'angular-web3-contract';
import {data} from './contract';
const config = {
    contract: {
        doc: data //data is json with abi and bytecode.
    },
    url: 'https://ropsten.infura.io/v3/31fab4142cac48158123efb4b4240a81',
    public_key: '0x261ED52fE08e9804056cd48D830fc61B66904978', //address
    private_key: '0x4D59565AE67F43C6D5FA317164A97930E7E75A79C7CBEDB91B2BB95CC1BFB1D5
};
@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, DemoMaterialModule, ReactiveFormsModule, FormsModule,
        AngularWeb3ContractModule.forRoot(config)
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```
2.-app.component.ts
```
import { ContractService } from 'angular-web3-contract';
import { ConfigService } from 'angular-web3-contract';
...
export class AppComponent {
    constructor(
        private contractService: ContractService,
        private configService: ConfigService) {
        //current contract
        this.contractService.$contract
            .subscribe(contract => {
                console.log('Contract', contract);
            });

    }
    //use pre existent contract
    useContract() {
        this.contract = this.contractService.generateContract(this.formUseContract.value.address);
    }
    //get methods smart contract
    getMethods() {
        this.methods = this.contractService.getMethods();
    }
    //get events smart contract
    getEvents() {
        this.events = this.contractService.getEvents();
    }
    createContract() {
        //temp is args constructor smart contract in array format [A,B,C,D]
        this.contractService.deployContract(temp)
            .then(ok => console.log('Res', ok))
            .catch(e => console.error('error', e));
    }
    //executed method, smart contract
    exec() {
        // data is args method in array format [A,B,C,D]
        this.contractService.executeMethod(name, data)
            .then(ok => {
                console.log('Result ', ok);
            }).catch(e => {
                console.log('Error', e);
            });
    }

    setConfig() {
        this.configService.setConfig(config: Partial < Config > )
    }
    setConfigContract() {
        this.configService.setConfigContract(config: Partial < CreateContract > )

    }

    getConfig() {
        this.configService.getConfig()
    }
    getConfigContract() {
        this.configService.getConfigContract()
    }
```
interfaces ref.
```
export interface Config {
    contract: {
        doc: object,
        address ? : string
    };
    url: string; //url provider
    network ? : number; //network default 3 robsten
    public_key: string; //address
    private_key: string; //private key
}

export interface CreateContract {
    name: string; //Test
    symbol: string; //T
    decimal: number; //18
    transaction: {
        nonce: string,
        gas: string,
        from: string
        gasPrice: string,
        to: any, //0x0
        chainId: number, //3 robsten
        data ? : string
    };
}
```

# Issues
#### Do not use running metamask at the same time(metamask inject old version web3.js, not support contracts)
