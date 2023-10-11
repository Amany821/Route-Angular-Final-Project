import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { Category } from 'src/app/Interfaces/category';
import { SubCategory } from 'src/app/Interfaces/sub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category!: Category;
  subCategories: SubCategory[] = [];
  isLoading: boolean = true;
  categoryName!: string;

  constructor(
    private categoryService: CategoryService,
    private loaderService: LoadingService
  ) {}

  onGetSubCategories(categoryId: string){
    this.loaderService.start();
    this.categoryService.getAllSubCategoriesOnCategory(categoryId).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
        // console.log(res.data);
      }, error: () => {}
    })
  }
}
