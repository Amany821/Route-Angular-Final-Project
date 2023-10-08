import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandInfoComponent } from '../Components/brand-info/brand-info.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  components = new Map<string, any>([
    ['brand-info', BrandInfoComponent]
  ]);

  constructor(
    private ngbModalService: NgbModal
    ) {}
  
  openModal(
    componentName: string,
    inputs?: Map<string, any>,
    size: string = ''
  ) {
    const modalRef = this.ngbModalService.open(
      this.components.get(componentName),
      { backdrop: 'static', size: size }
    );
    if (inputs) {
      inputs.forEach((value, key) => {
        modalRef.componentInstance[key] = value;
      });
    }
  }

  closeModal() {
    this.ngbModalService.dismissAll();
  }
}
