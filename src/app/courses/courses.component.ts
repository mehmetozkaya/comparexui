import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({  
  templateUrl: './courses.component.html',
  animations: [appModuleAnimation()]
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
