import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ServiceService } from "../service/service.service";
import { Observable } from "rxjs/Observable";
import * as jquery from "jquery";
import { Http } from '@angular/http';
import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ServiceService]
})
export class HomeComponent implements OnInit {
  categories: any;
  colors: any;
  companies: any;
  products: any;
  productForm: FormGroup;
  productName: any;
  companyName: any;
  dateOfPurchase: any;
  productWeight: any;
  productHeight: any;
  productLength: any;
  productCost: any;
  productColor: any;
  productCategory: any;
  productDetails: any;
  categoryObj: any[];
  productId: any;
  searchForm: FormGroup;
  searchProduct: any;
  searchedProducts: any;
  noProducts: boolean;
  constructor(private _httpService: Http, private service: ServiceService,
    private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.productName = new FormControl("", [Validators.required]);
    this.companyName = new FormControl("", [Validators.required]);
    this.dateOfPurchase = new FormControl("", [Validators.required]);
    this.productWeight = new FormControl("", [Validators.required]);
    this.productHeight = new FormControl("", [Validators.required]);
    this.productLength = new FormControl("", [Validators.required]);
    this.productCost = new FormControl("", [Validators.required]);
    this.productColor = new FormControl("", [Validators.required]);
    this.productCategory = new FormControl("", [Validators.required]);
    this.searchProduct = new FormControl("");
  }
  ngOnInit() {
    this.productId = 0;
    this.categoryObj = [];
    this.noProducts = false;
    this.productForm = this.formBuilder.group({
      productName: this.productName,
      companyName: this.companyName,
      dateOfPurchase: this.dateOfPurchase,
      productWeight: this.productWeight,
      productHeight: this.productHeight,
      productLength: this.productLength,
      productCost: this.productCost,
      productColor: this.productColor,
      productCategory: this.productCategory
    });
    this.searchForm = this.formBuilder.group({
      searchProduct: this.searchProduct
    })
    this.getCategories();
    this.getColors();
    this.getCompanies();
    this.getProducts();
    //this.route.snapshot.paramMap.get('id');
  }
  public getCategories() {
    this.service.getCategories().subscribe(response => {
      console.log(response.json());
      this.categories = response.json();
    }, error => {

    })
  }
  public getColors() {
    this.service.getColors().subscribe(response => {
      console.log(response.json());
      this.colors = response.json();
    }, error => {

    })
  }
  public getCompanies() {
    this.service.getCompanies().subscribe(response => {
      console.log(response.json());
      this.companies = response.json();
    }, error => {

    })
  }

  public getProducts() {
    this.service.getProducts().subscribe(response => {
      console.log(response.json());
      this.products = response.json();
    }, error => {

    })
  }

  public onCategoryChange(event, category) {
    console.log(event, category);
    if (event.target.checked) {
      this.categoryObj.push(category);
    } else if (!event.target.checked) {
      var index = this.categoryObj.indexOf(category);
      if (index > -1) {
        this.categoryObj.splice(index, 1);
      }
    }
  }
  public onSave() {
    this.productDetails = {
      name: this.productForm.value.productName,
      dateOfManufacture: this.productForm.value.dateOfPurchase,
      weight: this.productForm.value.productWeight,
      height: this.productForm.value.productHeight,
      length: this.productForm.value.productLength,
      cost: this.productForm.value.productCost,
      company: {
        id: this.productForm.value.companyName
      },
      color: {
        id: this.productForm.value.productColor
      },
      categories: this.categoryObj
    };
    this.service.saveProduct(this.productDetails).subscribe(response => {
      console.log("Product saved");
      this.getProducts();
    }, error => {

    })
  }

  public searchProducts() {
    if (this.searchForm.value.searchProduct) {
      this.noProducts = false;
      this.getProductsByName();
    } else {
      this.noProducts = false;
      this.getProducts();
    }
  }

  public getProductsByName() {
    this.service.searchProductsByName(this.searchForm.value.searchProduct).subscribe(response => {
      console.log(response.json());
      if (response.json().length != 0) {
        this.noProducts = false;
        this.products = response.json();
      } else {
        this.noProducts = true;
      }
    }, error => {

    })
  }

}