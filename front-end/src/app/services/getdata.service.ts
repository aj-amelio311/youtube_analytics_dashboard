import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private _http:Http) { }

  getResponse(urlparam:string) {
    return this._http.get(`http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/${urlparam}`)
  }


}
