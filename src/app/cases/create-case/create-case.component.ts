import { Component, Injector, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { CaseServiceProxy, CreateCaseInput } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from "ngx-bootstrap";
import { finalize } from 'rxjs/operators';

import * as _ from "lodash";
import * as moment from 'moment';

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
        private _caseService: CaseServiceProxy
    ) {
        super(injector);
    }
    
    show(): any {
        this.active = true;
        this.modal.show();
        this.case = new CreateCaseInput();
        this.case.init({ isActive : true });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
        $(this.caseDate.nativeElement).datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });
    }

    save(): void {
        this.saving = true;
        //this.case.date = moment($(this.caseDate.nativeElement).data('DateTimePicker').date().format('YYYY-MM-DDTHH:mm:ssZ'));

        this._caseService.createAsync(this.case)     
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

}