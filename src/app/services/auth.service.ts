import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AppService} from "../app.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  private app_token = '';
  private session_token = '';
  private user:any = null;
  constructor(private http:Http, private appService:AppService) { }

  getUser() {
      return (localStorage.getItem('user') != null)?JSON.parse(localStorage.getItem('user')):null;
  }

  grab_app_key(){
    return new Observable(observable=>{
      observable.next("WebClient");
    });
  }
  grab_session_token(app_key:any){
    return this.http.get(this.appService.api_end_point+"getSession/&AppKey="+app_key);
  }

  get_app_token(){
    return localStorage.getItem('app_token');
  };

  set_app_token(token){
    localStorage.setItem('app_token',token);
    this.app_token = token;
  };

  get_session_token(){
    return localStorage.getItem('session_token');
  };
  set_session_token(token){
    localStorage.setItem('session_token',token);
    this.session_token = token;
  };

  authenticated(){
    return (this.getUser() != null);
  }

//sets the authenticated user in the localStorage
  setUser(user:any){
    localStorage.setItem('user',user);
    this.user = user;
  }

  attempt(credentials){
      return this.http.get(this.appService.api_end_point+'userSignin/'+this.get_session_token()+'/&Email=&Username='+credentials.username+'&Pass='+credentials.password);
  }

  //removes the user from the localStorage
  logout(){
    return new Observable(observable => {
      localStorage.removeItem('user');
      this.user = null;
      observable.next({success:"true"});
    });
  };
}
