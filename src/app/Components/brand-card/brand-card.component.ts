import { Component, Input } from '@angular/core';
import { Brand } from 'src/app/Interfaces/brand';
import { ModalService } from 'src/app/Services/modal.service';
import { BrandInfoComponent } from '../brand-info/brand-info.component';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent {
  @Input() brand!: Brand;

  constructor(
    private modalService: ModalService
  ) { }

  onGetBrandInfo(){
    this.modalService.openModal("brand-info", new Map<string, any>([["brand", this.brand]]));
  }

}
