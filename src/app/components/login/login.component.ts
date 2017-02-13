import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import {AuthService} from '../../services/auth.service';
import {MediumToLoginService} from '../../services/medium-to-login.service';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from "../../models/User";
import {UserStuff} from "../../models/UserStuff";

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
  public title:any;
  constructor(
    private authenticator: AuthService, private rootService:AppService,
     private httpService: Http, appRouter: Router, private route: ActivatedRoute,
     private mediumToLogin:MediumToLoginService
   ) {
      this.auth = authenticator;
      this.appService = rootService;
      this.http = httpService;
      this.router = appRouter;
      this.title = this.mediumToLogin.getTitle();
  }

  attempt(form:NgForm){
      this.auth.attempt(form.value).subscribe(
          (data:Response) => {
              console.log(data);
              /*
               saving the authenticated user in the localStorage
               */
              let user = new User();
              let updatedUser = data.json().payload.User;
              for (var property in updatedUser) {
                  user[property] = updatedUser[property];
              }
              let userStuff = new UserStuff(user, data.json().payload.Timelines, data.json().ManagedUsers);
              this.auth.setUser(JSON.stringify(userStuff));
              if(this.auth.getUser().timelines.length > 0){
                  this.router.navigate(['/log/'+this.auth.getUser().timelines[0].Id]);
              }
              else
                  this.router.navigate(['create-profile']);
          },
          (e) => {
              this.errors = (e.json()['error_message'] != undefined)?e.json()['error_message']:'Something went wrong with the server or may be you internet connection is lost. please try a few moments later.';
          }
      );
  }

  ngOnInit() {
    //this.contact = this.route.snapshot.data['contact'];
  }
}