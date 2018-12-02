import { Component, Injector, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { CaseServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from "ngx-bootstrap";


@Component({
    selector: 'create-case-modal',
    templateUrl: './create-case.component.html'
})
export class CreateCaseComponent extends AppComponentBase{
  
    @ViewChild('createCaseModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @ViewChild('caseDate') caseDate: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  
    constructor(
        injector: Injector,
        private _eventService: CaseServiceProxy
    ) {
        super(injector);
    }
    
    show(): any {
    throw new Error("Method not implemented.");
  }

}