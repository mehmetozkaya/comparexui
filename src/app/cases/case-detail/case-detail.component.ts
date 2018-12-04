import { AppComponentBase } from "@shared/app-component-base";
import { OnInit, Injector } from "@angular/core";
import { CaseDetailOutput, CaseServiceProxy, EntityDtoOfGuid, CaseRegistrationDto, CaseRegisterOutput } from "@shared/service-proxies/service-proxies";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { __createInputTransfer } from "@angularclass/hmr";
import { AbpHttpInterceptor } from "abp-ng2-module/dist/src/abpHttpInterceptor";




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
                abp.notify.success('Successfully registered to event. Your registration id: ' + result.registrationId + ".");
                this.loadCase();
            })
    }

    loadCase(): void {
        this._caseService.getDetailAsync(this.caseId)
            .subscribe((result: CaseDetailOutput) => {
                this.case = result;
            });
    }

}