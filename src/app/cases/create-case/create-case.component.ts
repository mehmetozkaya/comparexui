import { Component, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { CaseServiceProxy } from "@shared/service-proxies/service-proxies";


@Component({
    selector: 'create-case-modal',
    templateUrl: './create-case.component.html'
})
export class CreateCaseComponent extends AppComponentBase{
  
  
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