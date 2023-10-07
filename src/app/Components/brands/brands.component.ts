import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Interfaces/brand';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{
  brands: Brand[] = [];
  constructor(
    private brandsService: BrandService
  ) {}

  ngOnInit(): void {
    this.brandsService.getAllBrand().subscribe({
      next:(res: any) => {
        this.brands = res.data;
      }, error:() => {

      }
    });
  }
}
