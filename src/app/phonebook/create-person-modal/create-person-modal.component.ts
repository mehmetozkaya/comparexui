import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { CreatePersonInput, PersonServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'createPersonModal',
  templateUrl: './create-person-modal.component.html'  
})
export class CreatePersonModalComponent extends AppComponentBase implements OnInit {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('nameInput') nameInput: ElementRef;

  person: CreatePersonInput = new CreatePersonInput();

  active: boolean = false;
  saving: boolean = false;

  constructor(
    injector: Injector,
    private _personService: PersonServiceProxy
  ) { 
    super(injector);
  }

  show(): void {
    this.active = true;
    this.person = new CreatePersonInput();
    this.modal.show();
  }

  onShown(): void {
    this.nameInput.nativeElement.focus();
  }

  save(): void {
    this.saving = true;
    this._personService.createPerson(this.person)
        .pipe(finalize(() => this.saving = false))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.close();
          this.modalSave.emit(this.person);
        });
  }

  close(): void {
    this.modal.hide();
    this.active = false;
  }

  ngOnInit() {
  }

}
