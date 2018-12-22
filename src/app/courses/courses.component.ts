import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CaseListDto, CourseDto, CourseServiceProxy, ListResultDtoOfCourseDto } from '@shared/service-proxies/service-proxies';

@Component({  
  templateUrl: './courses.component.html',
  animations: [appModuleAnimation()]
})
export class CoursesComponent extends PagedListingComponentBase<CourseDto> { 

  // @ViewChild('createCourseModal') createCourseModal : CreateCourseComponent;

  active: boolean = false;
  courses: CourseDto[] = [];
  
  constructor(
    injector: Injector,
    private _courseService: CourseServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.loadCourses();
    finishedCallback();
  }
  protected delete(entity: CourseDto): void {
    abp.message.confirm(
      'Are you sure you want to cancel this course ?',
      (result: boolean) => {
        if(result){
          this._courseService.cancelAsync(entity)
              .subscribe(() => {
                  abp.notify.info('Course is deleted');
                  this.refresh();
                });
        }
      }
    );
  }

  createCourse(): void {
    // this.createCourseModal.show();
  }

  loadCourses() {
    this._courseService.getListAsync(true)
        .subscribe((result: ListResultDtoOfCourseDto) => {
            this.courses = result.items;
          });
  }

  readfromCourse() : void {
    this.loadCourses();
    // TODO : read loaded courses for ui
  }

}
