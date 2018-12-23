import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CourseDetailOutput, CourseServiceProxy, EntityDto, CourseRegisterOutput, ListResultDtoOfCourseDto } from '@shared/service-proxies/service-proxies';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import * as _ from 'lodash';

@Component({  
  templateUrl: './course-detail.component.html',
  animations: [appModuleAnimation()]
})
export class CourseDetailComponent extends AppComponentBase implements OnInit {  
  
  course: CourseDetailOutput = new CourseDetailOutput();
  courseId: number;

  constructor(
    injector: Injector,
    private _courseService: CourseServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.courseId = params['courseId'];
      this.loadCourse();
    });
  }

  registerToCourse(): void {
    var input = new EntityDto();
    input.id = this.course.id;

    this._courseService.registerAsync(input)
        .subscribe((result: CourseRegisterOutput) => {
          abp.notify.success('Successfully registered to course. Your registration id: ' + result.registrationId + ".");
          this.loadCourse();
        })
  }

  cancelRegistrationFromCourse(): void {
    var input = new EntityDto();
    input.id = this.course.id;

    this._courseService.cancelRegistrationAsync(input)
        .subscribe(() => {
            abp.notify.info('Canceled your registration.');
            this.loadCourse();
        });
  }

  cancelCourse(): void {
    var input = new EntityDto();
    input.id = this.course.id;

    this._courseService.cancelAsync(input)
        .subscribe(() => {
            abp.notify.info('Canceled the course.');
            this.backToCoursesPage();
        });
  }

  isRegistered(): boolean {
    return _.some(this.course.registrations, { userId: abp.session.userId });
  }

  isCourseCreator(): boolean {
    return this.course.creatorUserId === abp.session.userId;
  }

  loadCourse(): void {
    this._courseService.getDetailAsync(this.courseId)
        .subscribe((result: CourseDetailOutput) => {
            this.course = result;
        });
  }

  backToCoursesPage() {
    this._router.navigate(['app/courses']);
  }

  gettingDetailResults() : void {
    this._courseService.getListAsync(true)
        .subscribe((result: ListResultDtoOfCourseDto) => {

        });
  }


}
