import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthenticateService {

  constructor(private _httpService: Http) { }

  authenticate(loginCredentials) {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    return this._httpService.post("http://localhost:8085/authenticate", loginCredentials, {headers: headers});
  }
}
