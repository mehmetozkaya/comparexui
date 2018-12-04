import { AppComponentBase } from "@shared/app-component-base";
import { OnInit, Injector } from "@angular/core";
import { CaseDetailOutput, CaseServiceProxy } from "@shared/service-proxies/service-proxies";
import { Router, ActivatedRoute, Params } from "@angular/router";




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

}