import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { CaseListDto, CreateCaseInput, CaseServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  //selector: 'app-cases',
  templateUrl: './cases.component.html',
  animations: [appModuleAnimation()]
  //styleUrls: ['./cases.component.css']
})
export class CasesComponent extends PagedListingComponentBase<CaseListDto> {

  @ViewChild('createEventModal') createEventModal : CreateCaseComponent;

  active: boolean = false;
  cases: CaseListDto[] = [];
  includeCanceledEvents:boolean=false;

  constructor(
    injector: Injector,
    private _caseService : CaseServiceProxy
  ) {
    super(injector);
  }

  

}
