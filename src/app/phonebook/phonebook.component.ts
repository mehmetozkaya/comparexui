import { AppComponentBase } from "@shared/app-component-base";
import { Component, Injector, OnInit } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { PersonDto, PersonServiceProxy } from "@shared/service-proxies/service-proxies";


@Component({
    templateUrl : './phonebook.component.html',
    animations : [appModuleAnimation()]
})
export class PhoneBookComponent extends AppComponentBase implements OnInit {
    
    people: PersonDto[] = [];
    filter: string = '';
    
    constructor(
        injector: Injector,
        private _personService : PersonServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getPeople();
    }

    getPeople(): void {
        this._personService.getPeople(this.filter)
            .subscribe((result) => {
                this.people = result.items;
            })
    }

}