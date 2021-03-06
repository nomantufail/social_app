"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PickColorComponent = (function () {
    function PickColorComponent(profileService, router, _location) {
        this.profileService = profileService;
        this.router = router;
        this._location = _location;
        this.colors = [
            'aquamarine',
            'beachblue',
            'bloodred',
            'brownbear',
            'chai',
            'cream',
            'creamsicleorange',
            'pinkrose',
            'plum',
            'bloodred',
            'brownbear',
            'cream'
        ];
    }
    PickColorComponent.prototype.clicked = function (color) {
        this.profileService.setColor(color);
        this._location.back();
    };
    PickColorComponent.prototype.ngOnInit = function () { };
    PickColorComponent = __decorate([
        core_1.Component({
            selector: 'sa-pick-color',
            templateUrl: './pick-color.component.html',
            styleUrls: ['./pick-color.component.css']
        })
    ], PickColorComponent);
    return PickColorComponent;
}());
exports.PickColorComponent = PickColorComponent;
//# sourceMappingURL=pick-color.component.js.map