import { AppComponentBase } from "@shared/app-component-base";
import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";


@Component({
    templateUrl : './phonebook.component.html',
    animations : [appModuleAnimation()]
})
export class PhoneBookComponent extends AppComponentBase {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}