import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

declare let require: any;
declare let window: any;
let tokenAbi = require('./tokenContract.json');

@Injectable()
export class SharedServices {
  finshedEvent = false;
  private getUrl1 = 'http://34.217.69.68:4040/events';
  // private getUrl1 = 'assets/json/events.json';
  private eventDetailComplete = false;
  private _account: string = null;
  private _web3: any;


  private _tokenContract: any;
  private _tokenContractAddress: string = "0xcf75a059f537d108cff6e4ec7d1870bbfb276bfb";


  constructor(private http: HttpClient) {
    this.setFinishedEvent(true);
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

  ngOnInit() {

  }

  setFinishedEvent(value: boolean) {
    this.finshedEvent = value;
  }
  getFinishedEvent() {
    return this.finshedEvent;
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
        if (err != null) {
          reject(err);
        }

        resolve(_web3.fromWei(result));
      });
    }) as Promise<number>;
  }

  public send(valueToSend: String) {
    let betData = this._tokenContract.enter(1, {
      gas: 300000,
      from: "0xb0129549FC430D0fdcEDf331261f2307ce70B53E",
      value: this._web3.toWei(valueToSend, 'ether')
    }, (err, result) => {
      console.log(result);
    });
    // this._web3.eth.sendTransaction({
    //     data: betData,  
    //   // value: this._web3.toWei(valueToSend, "ether"), 
    //     to: this._tokenContractAddress, 
    //     from: "0xb0129549FC430D0fdcEDf331261f2307ce70B53E"   
    //     }, function(error,result){console.log(result)})
  }

  public claim(steps: String) {
    let betData = this._tokenContract.claim(steps, {
      gas: 300000,
      from: "0xb0129549FC430D0fdcEDf331261f2307ce70B53E"
    }, (err, result) => {
      console.log(result);
    });
  }

  public receive() {
    this._web3.eth.sendTransaction({
      value: this._web3.toWei("2", "ether"),
      to: "0xb0129549FC430D0fdcEDf331261f2307ce70B53E",
      from: this._tokenContractAddress
    }, function (error, result) { console.log(result) })
  }

  // For string arrays
  getAssetJsonArray(): Observable<string[]> {
    return this.http.get<string[]>(this.getUrl1);
  }
  // for single strings
  // getAssetJson(): Observable<string> {
  //   return this.http.get<string>(this.getUrl1);
  // }

}