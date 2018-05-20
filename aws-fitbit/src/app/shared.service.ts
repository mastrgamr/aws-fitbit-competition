import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SharedService {
  private getUrl1 = 'http://34.219.124.19:3000/events';

  constructor(private http: HttpClient) {

  }

  // For string arrays
  getAssetJsonArray(): Observable<string[]> {
    return this.http.get<string[]>(this.getUrl1);
    // .map(assetJson => assetJson[sectionType]);
  }
  // for single strings
  getAssetJson(): Observable<string> {
    return this.http.get<string>(this.getUrl1);
    // .map(assetJson => assetJson[sectionType]);
  }


}

