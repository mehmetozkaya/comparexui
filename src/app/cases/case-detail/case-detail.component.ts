import { AppComponentBase } from "@shared/app-component-base";
import { OnInit, Injector, Component } from "@angular/core";
import { CaseDetailOutput, CaseServiceProxy, EntityDtoOfGuid, CaseRegisterOutput, ListResultDtoOfCaseListDto } from "@shared/service-proxies/service-proxies";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { __createInputTransfer } from "@angularclass/hmr";

import * as _ from "lodash";
import { appModuleAnimation } from "@shared/animations/routerTransition";

@Component({
    templateUrl: './case-detail.component.html',
    animations: [appModuleAnimation()]
})
export class CaseDetailComponent extends AppComponentBase implements OnInit {

    case: CaseDetailOutput = new CaseDetailOutput();
    caseId : string;

    constructor(
        injector : Injector,
        private _caseService : CaseServiceProxy,
        private _router : Router,
        private _activatedRoute : ActivatedRoute
    ) {
        super(injector);
    }    

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((params : Params) => {
            this.caseId = params['caseId'];
            this.loadCase();
        });
    }

    registerToCase(): void {
        var input = new EntityDtoOfGuid();
        input.id = this.case.id;

        this._caseService.registerAsync(input)
            .subscribe((result: CaseRegisterOutput) => {
                abp.notify.success('Successfully registered to case. Your registration id: ' + result.registrationId + ".");
                this.loadCase();
            });
    }

    cancelRegistrationFromCase(): void {
        var input = new EntityDtoOfGuid();
        input.id = this.case.id;

        this._caseService.cancelRegistrationAsync(input)
            .subscribe(() => {
                abp.notify.info('Canceled your registration.');
                this.loadCase();
            });
    };

    cancelCase(): void {
        var input = new EntityDtoOfGuid();
        input.id = this.case.id;

        this._caseService.cancelAsync(input)
            .subscribe(() => {
                abp.notify.info('Canceled the case.');
                this.backToCasesPage();
            });
    };

    isRegistered(): boolean {
        return _.some(this.case.registrations, { userId: abp.session.userId });
    };

    isCaseCreator(): boolean {
        return this.case.creatorUserId === abp.session.userId;
    };

    loadCase(): void {
        this._caseService.getDetailAsync(this.caseId)
            .subscribe((result: CaseDetailOutput) => {
                this.case = result;
            });
    };

    backToCasesPage() {
        this._router.navigate(['app/cases']);
    };

    gettingDetailResults() : void {
        this._caseService.getListAsync(true)
            .subscribe((result: ListResultDtoOfCaseListDto) => {

            });
    }

}