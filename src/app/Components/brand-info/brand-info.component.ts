import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/Interfaces/brand';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-brand-info',
  templateUrl: './brand-info.component.html',
  styleUrls: ['./brand-info.component.scss']
})
export class BrandInfoComponent {
  @Input() brand!: Brand;

  constructor(
    public modalService: ModalService
  ) {}
}
