import { Component, OnInit } from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
import {Response} from "@angular/http";
import {UserStuff} from "../../models/UserStuff";
import {TimelineService} from "../../services/timeline.service";

@Component({
  selector: 'app-invite-managed-user',
  templateUrl: './invite-managed-user.component.html',
  styleUrls: ['./invite-managed-user.component.css']
})
export class InviteManagedUserComponent implements OnInit {

  public formBusy:boolean;
  public title:string;
  private timelineId:string = '';
  constructor(public router:Router,
              public auth:AuthService,
              public usersService:UsersService,
              public timelineService:TimelineService,
              public activatedRoute:ActivatedRoute
  ) {
    this.title = 'Invite Managed Profile';
    this.formBusy = false;
  }

  ngOnInit() {
    this.activatedRoute.params
        .map(params => params['id'])
        .subscribe((timelineId) => {
          this.timelineId = timelineId;
        });
  }

  profileCreated(event){
    console.log(event.user);
    this.usersService.getUserTimelinesAndStuff().subscribe((data:Response)=>{
      let mapedData = data.json().payload;
      let userStuff = new UserStuff(mapedData.User, mapedData.Timelines, mapedData.ManagedUsers);
      this.auth.setUser(JSON.stringify(userStuff));
      this.timelineService.inviteUsers(this.timelineId,event.user.UserId,"").subscribe((data:Response)=>{
        alert('Managed user invited successfully');
        this.formBusy = false;
        this.router.navigate(['/manage-logs']);
      });
    });
  }
  profileCreating(event){
    this.formBusy = true;
  }
}