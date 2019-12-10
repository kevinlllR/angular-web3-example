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
    doc: data
  },
  url: 'https://ropsten.infura.io/v3/31fab4142cac48158123efb4b4240a81',
  public_key: '0x261ED52fE08e9804056cd48D830fc61B66904978',
  private_key: '0x4D59565AE67F43C6D5FA317164A97930E7E75A79C7CBEDB91B2BB95CC1BFB1D5'

};
@NgModule({
  imports:      [ BrowserModule,    BrowserAnimationsModule, DemoMaterialModule, ReactiveFormsModule, FormsModule,
    AngularWeb3ContractModule.forRoot(config)
   ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
