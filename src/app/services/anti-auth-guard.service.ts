// this service is a guard which protect routes from authenticated users.

import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AntiAuthGuardService implements CanActivate{

  private auth: AuthService;
  private router: Router;
  private currentRoute: ActivatedRoute;

  constructor(
    private authService: AuthService,
    private appRouter: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.auth = authService;
    this.router = appRouter;
    this.currentRoute = activatedRoute;
  }

  canActivate(){
    if(!this.auth.authenticated()){
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
