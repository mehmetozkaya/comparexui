import { AppComponentBase } from "@shared/app-component-base";
import { Component, Injector, OnInit } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { PersonDto, PersonServiceProxy, AddPhoneInput, AddPhoneInputType, PhoneInPersonDtoType } from "@shared/service-proxies/service-proxies";
import * as _ from "lodash";


@Component({
    templateUrl : './phonebook.component.html',
    animations : [appModuleAnimation()]
})
export class PhoneBookComponent extends AppComponentBase implements OnInit {
    
    people: PersonDto[] = [];
    filter: string = '';

    editingPerson: PersonDto = null;
    newPhone: AddPhoneInput = null;
    
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

    deletePerson(person: PersonDto): void {
        debugger;
        this.message.confirm(
            this.l('AreYouSureToDeleteThePerson', person.name),
            isConfirmed => {
                if (isConfirmed) {
                    this._personService.deletePerson(person.id)
                        .subscribe((result) => {
                            this.notify.info(this.l('SuccessfullyDeleted'));
                            _.remove(this.people, person);
                        });
                }
            }
        );        
    }

    editPerson(person: PersonDto): void {
        if(person === this.editingPerson) {
            this.editingPerson = null;
        } else {
            this.editingPerson = person;

            this.newPhone = new AddPhoneInput();
            this.newPhone.type = AddPhoneInputType._0;
            this.newPhone.personId = person.id;
        }
    }

    getPhoneTypeAsString(phoneType: PhoneInPersonDtoType): string {
        switch(phoneType) {
            case PhoneInPersonDtoType._0:
                return this.l('PhoneType_Mobile');
            case PhoneInPersonDtoType._1:
                return this.l('PhoneType_Home');
            case PhoneInPersonDtoType._2:
                return this.l('PhoneType_Business');
            default:
                return '?';
        }
    }

    deletePhone(phone, person): void {
        this._personService.deletePhone(phone.id)
            .subscribe(() => {
                this.notify.success(this.l('SuccessfullyDeleted'));
                _.remove(person.phones, phone);
            });
    }

    savePhone(): void {
        if(!this.newPhone.number) {
            this.message.warn('Please enter a number!');
            return;
        }

        this._personService.addPhone(this.newPhone)
            .subscribe(result => {
                this.editingPerson.phones.push(result);
                this.newPhone.number = "";

                this.notify.success(this.l('SavedSuccessfully'));
            })
    }

}