var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { AppService } from "../app.service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { UploadedFile } from "../models/UploadedFile";
export var UsersService = (function () {
    function UsersService(http, appService, auth) {
        this.http = http;
        this.appService = appService;
        this.auth = auth;
    }
    UsersService.prototype.register = function (user) {
        return this.http.get(this.appService.api_end_point + 'userRegister/' + this.auth.get_session_token() + '/&Email=' + user.email + '&Pass=' + user.password + '');
    };
    UsersService.prototype.createManagedUser = function (user, managedById) {
        var querystr = "";
        for (var propertyName in user) {
            querystr += '&' + propertyName + '=' + user[propertyName];
        }
        return this.http.get(this.appService.api_end_point + 'userRegister/' + this.auth.get_session_token() + "/&ManagedById=" + managedById + querystr);
    };
    UsersService.prototype.updateSettings = function (managedProfile, userId, settings, image) {
        if (image === void 0) { image = null; }
        var querystr = "";
        for (var propertyName in settings) {
            querystr += '&' + propertyName + '=' + settings[propertyName];
        }
        return this.http.post(this.appService.api_end_point + 'userSettings/' + this.auth.get_session_token() + "/&" + ((managedProfile) ? "ManageUserId" : 'UserId') + "=" + userId + '' + querystr, image);
    };
    UsersService.prototype.searchByKeyword = function (keyword) {
        if (keyword === void 0) { keyword = ""; }
        return this.http.get(this.appService.api_end_point + 'userSearch/' + this.auth.get_session_token() + "/&SearchFor=" + keyword);
    };
    UsersService.prototype.getUserTimelinesAndStuff = function () {
        return this.http.get(this.appService.api_end_point + 'userSignin/' + this.auth.get_session_token());
    };
    UsersService.prototype.findMangedUserById = function (userId) {
        if (userId == this.auth.getUser().profile.UserId) {
            return this.auth.getUser().profile;
        }
        for (var _i = 0, _a = this.auth.getUser().managedUsers; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.UserId == userId) {
                return user;
            }
        }
        return null;
    };
    UsersService.prototype.uploadUserImage = function (files, progress) {
        var _this = this;
        if (files === void 0) { files = {}; }
        if (progress === void 0) { progress = null; }
        return new Observable(function (observable) {
            $.ajax({
                method: 'POST',
                url: 'http://api-social.apptazer.com/api/entryFileUpload/ses012617-02d0ceae14c66a181ef92dd099e3aadb',
                dataType: 'json',
                data: files,
                processData: false,
                contentType: false,
                success: function (data) {
                    var Files = [];
                    for (var _i = 0, _a = data.payload.Files; _i < _a.length; _i++) {
                        var file = _a[_i];
                        Files.push(_this.appService.map(file, new UploadedFile()));
                    }
                    observable.next(Files);
                },
                error: function (error) {
                    observable.next({ data: error });
                },
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", progress, false);
                    return xhr;
                },
            });
        });
    };
    UsersService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, AppService, AuthService])
    ], UsersService);
    return UsersService;
}());
//# sourceMappingURL=/Users/nomantufail/workspace/php/coding-pixel/social_app/dev/src/app/services/users.service.js.map