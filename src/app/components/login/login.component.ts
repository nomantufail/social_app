import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import {AuthService} from '../../services/auth.service';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'sa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private auth:AuthService;
  private appService: AppService;
  private http: Http;
  private router: Router;
  public errors:any;
  public user:any;
  constructor(
    private authenticator: AuthService, private rootService:AppService,
     private httpService: Http, appRouter: Router, private route: ActivatedRoute
   ) {
      this.auth = authenticator;
      this.appService = rootService;
      this.http = httpService;
      this.router = appRouter;
      this.user = {
        email:'',
        password:''
      };
  }

  attempt(form:NgForm){
    this.http.get('http://api-social.apptazer.com/api/userSignin/ses09812098312/&email=&username='+form.value.username+'&pass='+form.value.password).subscribe(
      (data:Response) => {
        console.log(data.json());
        this.auth.set_app_token('asssbbb34ccc');
        this.auth.set_session_token('asssbbb34ccc');
        this.router.navigate(['home']);
      },
      (e) => {
        this.errors = e.json()['error-message'];
        console.log(e.json())
      }
    );
  }

  ngOnInit() {
    //this.contact = this.route.snapshot.data['contact'];
  }
}
