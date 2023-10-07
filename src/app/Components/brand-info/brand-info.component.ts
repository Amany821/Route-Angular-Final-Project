import { Component, Input } from '@angular/core';
import { Brand } from 'src/app/Interfaces/brand';

@Component({
  selector: 'app-brand-info',
  templateUrl: './brand-info.component.html',
  styleUrls: ['./brand-info.component.scss']
})
export class BrandInfoComponent {
  @Input() brand!: Brand;

  constructor() {}
}
