import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Brand } from 'src/app/Interfaces/brand';
import { BrandService } from 'src/app/Services/brand.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{
  brands: Brand[] = [];

  constructor(
    private brandsService: BrandService,
    private loaderService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loaderService.start();
    this.brandsService.getAllBrand().pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        this.brands = res.data;
      }, error:() => {

      }
    });
  }
}
