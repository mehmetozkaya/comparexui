import { AppComponentBase } from "@shared/app-component-base";
import { OnInit } from "@angular/core";
import { CaseDetailOutput } from "@shared/service-proxies/service-proxies";




export class CaseDetailComponent extends AppComponentBase implements OnInit {

    case: CaseDetailOutput = new CaseDetailOutput();
    caseId : string;


    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}