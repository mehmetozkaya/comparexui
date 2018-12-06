import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CaseListDto, CreateCaseInput, CaseServiceProxy, EntityDtoOfGuid, ListResultDtoOfCaseListDto } from '@shared/service-proxies/service-proxies';
import { CreateCaseComponent } from './create-case/create-case.component';

@Component({  
  templateUrl: './cases.component.html',
  animations: [appModuleAnimation()]  
})
export class CasesComponent extends PagedListingComponentBase<CaseListDto> {

  @ViewChild('createCaseModal') createCaseModal : CreateCaseComponent;

  active: boolean = false;
  cases: CaseListDto[] = [];
  includeCanceledCases:boolean=false;

  constructor(
    injector: Injector,
    private _caseService : CaseServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function) : void {
    this.loadCases();
    finishedCallback();
  }

  protected delete(event: EntityDtoOfGuid) : void {
    abp.message.confirm(
      'Are you sure you want to cancel this case?',
      (result: boolean) => {
        if(result){
          this._caseService.cancelAsync(event)
              .subscribe(() => {
                  abp.notify.info('Case is deleted');
                  this.refresh();
                });
        }
      }
    );
  }

  includeCanceledCasesCheckboxChanged() {
    this.loadCases();
  };

   // Show Modals
   createCase(): void {
    this.createCaseModal.show();
  }

  loadCases() {
    this._caseService.getListAsync(this.includeCanceledCases)
        .subscribe((result: ListResultDtoOfCaseListDto) => {
            this.cases = result.items;
          });
  }

  readfromCase() : void {
    this.loadCases();
    // TODO : read loaded cases for ui
  }

}
