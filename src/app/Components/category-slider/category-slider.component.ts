import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Brand } from 'src/app/Interfaces/brand';
import { Category } from 'src/app/Interfaces/category';
import { SubCategoryList } from 'src/app/Interfaces/sub-category-list';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss']
})
export class CategorySliderComponent implements OnInit{
  // categories: Brand[] = [];
  categories: Category[] = [];
  subCategories: SubCategoryList[] = [];
  categoryName!: string;
  categoryCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      }
    },
    nav: true,
    autoplay: false
  }

  constructor(
    private categoriesService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res: any) => {
        this.categories = res.data;
      },error:(err) => {},
    });
  }

  onGetCategoriesInfo(categoryId: string, categoryName: string) {
    this.subCategories = []
    this.categoryName = categoryName
    this.categoriesService.getAllSubCategoriesOnCategory(categoryId).subscribe({
      next:(res: any) => {
        this.subCategories = res.data;
        // console.log(this.subCategories);
      },error: () => {}
    })
  }
}
