import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Category } from 'src/app/Interfaces/category';
import { SubCategoryList } from 'src/app/Interfaces/sub-category-list';
import { CategoryService } from 'src/app/Services/category.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  categories: Category[] = [];
  subCategories: SubCategoryList[] = [];
  categoryName!: string;
  noSub!: boolean;

  constructor(
    private categoryService: CategoryService,
    private loaderService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loaderService.start();
    this.categoryService.getAllCategories().pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next: (res) => {
        this.categories = res.data;
        // console.log(this.categories);
      },error: () => {}
    });
  }

  onGetSubCategories(categoryId: string, categoryName: string){
    // this.loaderService.start();
    this.subCategories = [];
    this.noSub = false;
    this.categoryName = categoryName;
    this.categoryService.getAllSubCategoriesOnCategory(categoryId).subscribe({
      next:(res: any) => {
        this.subCategories = res.data;
        if(this.subCategories.length > 0) {
          this.noSub = false;
        } else{
          this.noSub = true;
        }
      },error: () => {}
    })
  }
}
