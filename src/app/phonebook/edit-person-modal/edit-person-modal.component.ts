import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { EditPersonInput, PersonServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'editPersonModal',
  templateUrl: './edit-person-modal.component.html'  
})
export class EditPersonModalComponent extends AppComponentBase {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('modalContent') modalContent: ElementRef;
  
  person: EditPersonInput = new EditPersonInput();

  active: boolean = false;
  saving: boolean = false;

  constructor(
    injector: Injector,
    private _personService: PersonServiceProxy
  ) {
    super(injector);
  }

  show(personId): void {
    this.active = true;
    this._personService.getPersonForEdit(personId)
        .subscribe(result => {
          this.person = result;
          this.modal.show();
        });
  }

  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    this.nameInput.nativeElement.focus();
   }

   save(): void {
     this.saving = true;
     this._personService.editPerson(this.person)
         .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.close();
          this.modalSave.emit(this.person);
         });
     this.saving = false;
   }

   close(): void {
    this.modal.hide();
    this.active = false;
  }

}
