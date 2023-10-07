import { Component, Input } from '@angular/core';
import { Category } from 'src/app/Interfaces/category';
import { SubCategory } from 'src/app/Interfaces/sub-category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category!: Category;
  subCategories: SubCategory[] = [];
  categoryName!: string;
  constructor(
    private categoryService: CategoryService
  ) {}

  onGetSubCategories(categoryId: string){
    this.categoryService.getAllSubCategoriesOnCategory(categoryId).subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
        // console.log(res.data);
      }, error: () => {}
    })
  }
}
