import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;
let tokenAbi = require('./tokenContract.json');

@Injectable()
export class SharedServices {
    private _account: string = null;
    private _web3: any;
  
    private _tokenContract: any;
    private _tokenContractAddress: string = "0xbc84f3bf7dd607a37f9e5848a6333e6c188d926c";
  
    constructor() {
      if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        this._web3 = new Web3(window.web3.currentProvider);
      } else {
        console.warn(
          'Please use a dapp browser like mist or MetaMask plugin for chrome'
        );
      }
  
      this._tokenContract = this._web3.eth.contract(tokenAbi).at(this._tokenContractAddress);
    }

    public async getAccount(): Promise<string> {
        if (this._account == null) {
          this._account = await new Promise((resolve, reject) => {
            this._web3.eth.getAccounts((err, accs) => {
              if (err != null) {
                console.log('There was an error fetching your accounts.');
                return;
              }
      
              if (accs.length === 0) {
                console.log(
                  'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
                );
                return;
              }
              resolve(accs[0]);
            })
          }) as string;
      
          this._web3.eth.defaultAccount = this._account;
        }
      
        return Promise.resolve(this._account);
      }


      public async getUserBalance(): Promise<number> {
        let account = await this.getAccount();
      
        return new Promise((resolve, reject) => {
          let _web3 = this._web3;
          this._tokenContract.balanceOf.call(account, function (err, result) {
            if(err != null) {
              reject(err);
            }
      
            resolve(_web3.fromWei(result));
          });
        }) as Promise<number>;
      }

      public send(valueToSend: String) {
          this._web3.eth.sendTransaction({
              value: this._web3.toWei(valueToSend, "ether"), 
              to: this._tokenContractAddress, 
              from: "0xb0129549FC430D0fdcEDf331261f2307ce70B53E"   
              }, function(error,result){console.log(result)})
      }

    //   public receive(addressToSend: String) {
    //     this._web3.eth.sendTransaction({
    //         value: this._web3.toWei(, "ether"), 
    //         to: this._tokenContractAddress, 
    //         from: "0xb0129549FC430D0fdcEDf331261f2307ce70B53E"   
    //         }, function(error,result){console.log(result)})
    //   }


}