import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  //selector: 'app-cases',
  templateUrl: './cases.component.html',
  animations: [appModuleAnimation()]
  //styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
