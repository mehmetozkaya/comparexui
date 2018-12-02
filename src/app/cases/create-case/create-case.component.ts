import { Component, Injector, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { CaseServiceProxy, CreateCaseInput } from "@shared/service-proxies/service-proxies";
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

    active: boolean = false;
    saving: boolean = false;
    case: CreateCaseInput = null;
  
    constructor(
        injector: Injector,
        private _eventService: CaseServiceProxy
    ) {
        super(injector);
    }
    
    show(): any {
        this.active = true;
        this.modal.show();
        this.case = new CreateCaseInput();
        this.case.init({ isActive : true });
  }

}