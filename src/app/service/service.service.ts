import { Injectable } from '@angular/core';
import {
  HttpModule,
  Http,
  Response,
  Headers,
  RequestOptions
} from "@angular/http";
import { HttpResponse } from "selenium-webdriver/http";
import { Observable } from "rxjs/Observable";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _httpService : Http, private _localStorage: LocalStorageService) { }

  getHeaders(): Headers {
    var headers = new Headers({ "Content-Type": "application/json" });
    return headers;
  }
  setUserDetails(userDetails) {
    this._localStorage.set("userDetails", userDetails);
  }
  getUserDetails(): any {
    return this._localStorage.get("userDetails");
  }
  getCategories(): Observable<Response> {
    return this._httpService.get("http://localhost:8085/category/all");
  }
  getColors(): Observable<Response> {
    return this._httpService.get("http://localhost:8085/color/all");
  }
  getCompanies(): Observable<Response> {
    return this._httpService.get("http://localhost:8085/company/all");
  }
  getProducts(): Observable<Response> {
    return this._httpService.get("http://localhost:8085/product/all");
  }
  saveProduct(productDetails): Observable<Response> {
    var options = {
      headers: this.getHeaders()
    };
    return this._httpService.post(
      "http://localhost:8085/product",
      productDetails,
      options
    );
  }
  getProductById(id): Observable<Response> {
    return this._httpService.get("http://localhost:8085/product/"+id);
  }
  deleteProduct(id): Observable<Response> {
    return this._httpService.delete("http://localhost:8085/product/"+id);
  }
  searchProductsByName(name) : Observable<Response> {
    return this._httpService.get("http://localhost:8085/products/"+name);
  }
  signupUser(userDetails): Observable<Response> {
    var options = {
      headers: this.getHeaders()
    };
    return this._httpService.post(
      "http://localhost:8085/signup",
      userDetails,
      options
    );
  }
}
