import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { CreateCourseInput, CourseServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

import * as _ from "lodash";
import * as moment from 'moment';

@Component({
  selector: 'create-course-modal',
  templateUrl: './create-course.component.html'  
})
export class CreateCourseComponent extends AppComponentBase {

  @ViewChild('createCourseModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;
  @ViewChild('courseDate') courseDate: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active: boolean = false;
  saving: boolean = false;
  course: CreateCourseInput = null;

  constructor(
    injector: Injector,
    private _courseService: CourseServiceProxy
  ) {
      super(injector);
  }

  show(): any {
    this.active = true;
    this.modal.show();
    this.course = new CreateCourseInput();
    this.course.init({ isActive : true });
  }


  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    $(this.courseDate.nativeElement).datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });
  }

  save(): void {
    this.saving = true;
    this.course.date = moment(this.courseDate.nativeElement.value,"DD/MM/YYYY");      

    this._courseService.createAsync(this.course)     
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
