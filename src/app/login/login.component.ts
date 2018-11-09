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
import { AuthenticateService } from "../service/authenticate.service";
import { Observable } from "rxjs/Observable";
import * as jquery from "jquery";
import { Http } from '@angular/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ServiceService, AuthenticateService]
})
export class LoginComponent implements OnInit {
  showLoginContainer: boolean = false;
  showSignUpContainer: boolean = false;
  loginForm: FormGroup;
  email: any;
  password: any;
  signupForm: FormGroup;
  firstName: any;
  lastName: any;
  emailId: any;
  signupPassword: any;
  signupDetails: any;
  loginCredentials : any;
  signupSuccess: boolean = false;

  constructor(private _httpService: Http, private service: ServiceService,
    private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private authenticateService : AuthenticateService) {
    this.email = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);
    this.firstName = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.emailId = new FormControl("", [Validators.required]);
    this.signupPassword = new FormControl("", [Validators.required]);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
    this.signupForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
      signupPassword: this.signupPassword
    })
  }
  public doLogin() {
    this.loginCredentials = {
      email : this.loginForm.value.email,
      password : this.loginForm.value.password,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    this.authenticateService.authenticate(this.loginCredentials).subscribe(response => {
      console.log("User logged in");
      this.service.setUserDetails(response.json());
      this.router.navigateByUrl('/home');
    }, error => {

    });
  }
  public doSignUp() {
    this.signupDetails = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.emailId,
      password: this.signupForm.value.signupPassword
    };
    this.service.signupUser(this.signupDetails).subscribe(response => {
      console.log("User saved");
      this.signupForm.reset();
      this.signupSuccess = true;
    }, error => {
      this.signupSuccess = false;
    })
  }
}
