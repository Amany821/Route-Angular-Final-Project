import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/category';
import { SubCategoryList } from 'src/app/Interfaces/sub-category-list';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  categories: Category[] = [];
  subCategories: SubCategoryList[] = [];
  categoryName!: string;

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        // console.log(this.categories);
      },error: () => {}
    });
  }

  onGetSubCategories(categoryId: string, categoryName: string){
    this.subCategories = []
    this.categoryName = categoryName
    this.categoryService.getAllSubCategoriesOnCategory(categoryId).subscribe({
      next:(res: any) => {
        this.subCategories = res.data;
        // console.log(this.subCategories);
      },error: () => {}
    })
  }
}
