import { Component, Input } from '@angular/core';
import { SubCategory } from 'src/app/Interfaces/sub-category';

@Component({
  selector: 'app-sub-category-card',
  templateUrl: './sub-category-card.component.html',
  styleUrls: ['./sub-category-card.component.scss']
})
export class SubCategoryCardComponent {
  @Input() subCategory!: SubCategory;
}
