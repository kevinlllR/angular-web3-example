import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ContractService } from 'angular-web3-contract';
import { ConfigService } from 'angular-web3-contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-web3-example';
  selectMethod;
  stable = false;
  web3: any;
  contract: any;
  methods: any;
  events: any;
  formAddress: FormGroup;
  formTrans: FormGroup;
  statusDeploy: Array<any> = [];
  infoAddressData: Array<any> = [];
  infoTransData: Array<any> = [];
  miContrato: any = null;
  defaultAccount: any;
  accounts: any;
  formBalance: FormGroup;
  formMint: FormGroup;
  formUseContract: FormGroup;
  formCreateContract: FormGroup;
  formMethod: FormGroup;

  constructor(private contractService: ContractService, private configService: ConfigService) {

    this.configService.setConfigContract({

    });
    this.contractService.$contract
      .subscribe(ok => {

        console.log('Contract', ok);
      });
    this.formBalance = new FormGroup({
      address: new FormControl('', [Validators.required])
    });
    this.formUseContract = new FormGroup({
      address: new FormControl('', [Validators.required])
    });

    this.formMethod = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
    this.formCreateContract = new FormGroup({
      name: new FormControl('', [Validators.required]),
      _symbol: new FormControl('', [Validators.required]),
      decimal: new FormControl('', [Validators.required])
    });
    console.log(contractService.getContract());
  }

   ngOnInit() {

  }

  useContract() {
    this.contract = this.contractService.generateContract(this.formUseContract.value.address);
    console.log(this.contract);
    this.methods = this.contractService.getMethods();
    this.events = this.contractService.getEvents();
  }

  changeContract() {
    this.clean();
  }
  clean() {
    this.formCreateContract.reset();
    this.formUseContract.reset();
    this.miContrato = null;
    this.formMethod.reset();

  }

  createContract() {
    const val = this.formCreateContract.value;
    console.log('Val', val);
    val['decimal'] = +val['decimal'];
    const temp = Object.values(val);
    console.log(temp);
    this.contractService.deployContract(temp)
      .then(ok => console.log('Res', ok))
      .catch(e => console.error('error', e));

  }
  selectionChange(event) {

    this.formMethod.patchValue({
      name: event.value.name
    });
    console.log('lenght', this.selectMethod.inputs.length);
    const arrayControl: FormArray = new FormArray([]);
    for (let i = 0; i < this.selectMethod.inputs.length; i++) {
      console.log(this.selectMethod.inputs[i]);
      const tempControl = new FormGroup({

        name: new FormControl('', [Validators.required]),
        label: new FormControl({ value: this.selectMethod.inputs[i].name, disabled: true }),
        type: new FormControl({ value: this.selectMethod.inputs[i].type, disabled: true })

      });
      console.log(tempControl);
      arrayControl.push(tempControl);
    }
    if (this.formMethod.controls.args) {
      this.formMethod.setControl('args', arrayControl);
    } else {
      this.formMethod.addControl('args', arrayControl);
    }
  }
  exec() {
    console.log(this.formMethod.value);
    const name = this.formMethod.value.name;
    const process = this.formMethod.value.args.map(item => {
      return item.name;
    });
    console.log(process);

    this.contractService.executeMethod(name, process)
      .then(ok => {
        console.log('Result ', ok);
      }).catch(e => {
        console.log('Error', e);
      });

  }
  // getNames(fn) {
  //   console.log('getnames', fn);
  //   return fn.match(/\(.*?\)/)
  //     ? fn
  //         .match(/\(.*?\)/)[0]
  //         .replace(/[()]/gi, '')
  //         .replace(/\s/gi, '')
  //         .split(',')
  //     : null;
  // }
}
