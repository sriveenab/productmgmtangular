import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ServiceService } from "../service/service.service";
import { Observable } from "rxjs/Observable";
import * as jquery from "jquery";
import { Http } from '@angular/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ServiceService]
})
export class ProductComponent implements OnInit {
  constructor(private _httpService: Http, private service: ServiceService, private router : Router, private route: ActivatedRoute) { }
  product: any;
  productName: String;
  cost: any;
  dateOfManufacture: any;
  weight : any;
  height : any;
  length : any;
  color : any;
  categories : any[];
  company : any;
  ngOnInit() {
    this.categories = [];
    console.log(this.router);
    this.service.getProductById(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(response => {
      console.log(response.json());
      this.product = response.json();
      this.productName = this.product.name;
      this.cost = this.product.cost;
      this.dateOfManufacture = this.product.dateOfManufacture;
      this.weight = this.product.weight;
      this.height =  this.product.height;
      this.length =  this.product.length;
      this.color = this.product.color.name;
      this.company = this.product.company.name;
      this.product.categories.forEach(category => {
        this.categories.push(category);
      });
      
    }, error => {

    })
  }

}
