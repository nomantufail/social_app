import {Component, OnInit, Input} from '@angular/core';
import {TimelineDetail} from "../../models/TimelineDetail";
import {AppService} from "../../app.service";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth.service";
import {TimelineService} from "../../services/timeline.service";
import {Response} from "@angular/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import * as _ from 'lodash';
import {UsersService} from "../../services/users.service";
import {UserStuff} from "../../models/UserStuff";

declare var $: any;
@Component({
  selector: 'app-timeline-detail',
  templateUrl: './timeline-detail.component.html',
  styleUrls: ['./timeline-detail.component.css']
})
export class TimelineDetailComponent implements OnInit {

  @Input() timeline:TimelineDetail;
  public edit_log_modal_id:string = '';
  public confirm_del_user_id:string = '';
  constructor(
      public app:AppService,
      public auth:AuthService,
      public timelineService:TimelineService,
      public router:Router,
      public usersService:UsersService
  ) {
    this.timeline = new TimelineDetail();
  }

  currentUserCanEditThis(user:User){
    return (this.usersService.findMangedUserById(user.UserId) != null ||
    user.UserId == this.auth.getUser().profile.UserId);
  }
  currentUserCanDeleteThis(user:User){
    return ((this.usersService.findMangedUserById(user.UserId) != null ||
              this.timeline.CreatedByUserId == this.auth.getUser().profile.UserId) &&
            (user.UserId != this.auth.getUser().profile.UserId));
  }

  updateLog(form:NgForm){ //TODO: push these changes to local storage
    this.timelineService.update(this.timeline.Id, form.value).subscribe((data:Response)=>{
        this.timeline.Name = form.value.Name;
      $('#'+this.edit_log_modal_id).modal('hide');
    },(error)=>{
      this.app.show_error_popup('some thing went wrong');
      $('#'+this.edit_log_modal_id).modal('hide');
    });
  }

  editUser(user:User){ //TODO: push these changes to local storage
    let userfound = this.usersService.findMangedUserById(user.UserId);
    let actualUser = new User();
    for (var property in userfound) {
      actualUser[property] = userfound[property];
    }
    //*****************************//
    localStorage.setItem('viewUserProfile',JSON.stringify(actualUser));
    this.router.navigate(['/profile/'+userfound.UserId+'/edit']);
  }

  public deleting_user_id = 0;
  confirmRemoveUsr(deleting_user_id){
    this.deleting_user_id = deleting_user_id;
    $('#'+this.confirm_del_user_id).modal('show');
  }
  removeUser(userId:string){ //TODO: push these changes to local storage
    if(userId == this.auth.currentUser.UserId){
      this.app.show_error_popup('Can not remove yourself');
    }else {
      //TODO: Couldn't test it at the time for some reason.
      this.timelineService.removeUsers(this.timeline.Id,userId).subscribe((data:Response)=>{
        let updatedUsers:Array<User> = [];
        let existingUsers = _.cloneDeep(this.timeline.Users);
        for (let user of existingUsers){
          if(user.UserId != userId)
            updatedUsers.push(user);
        }
        this.timeline.Users = updatedUsers;
        this.app.show_success_popup('user deleted')
      }, (error)=>{
        this.app.show_error_popup('some thing went wrong the server');
      });
    }
  }

  ngOnInit() {
    this.edit_log_modal_id = 'edit-log-'+this.app.unique_id();
    this.confirm_del_user_id = 'confirm-user-del-'+this.app.unique_id();
  }
}
