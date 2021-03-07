import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductService } from 'src/app/services/product.service';
import { fadeAnimation } from '../../../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeAnimation] // register the animation
})
export class HomeComponent implements OnInit, OnDestroy {

  page : any;
  title : string;
  private querySub : Subscription;
  private paramSub : Subscription;

  constructor(private productService : ProductService, private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.activeRoute.queryParams.subscribe(data => {
        this.update();
    });
    this.paramSub = this.activeRoute.params.subscribe(data => {
        this.update();
    })
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  update() : void {
    // if(this.activeRoute.snapshot.queryParamMap.get('page')) {
    //   const currentPage = +this.activeRoute.snapshot.queryParamMap.get('page');
    //   const size = +this.activeRoute.snapshot.queryParamMap.get('size');
    //   this.getProds(currentPage , size);
    // }
    // else {
      this.getProds();
    // }
  }

  getProds(page : number = 1 , size : number = 100) {
    //if(this.activeRoute.snapshot.url.length == 1) {
      this.productService.getAllInPage(+page,  +size)
        .subscribe(page => {
          this.page = page;
          this.title = 'Choose your products';
        });
    //}
    /* else {
      const type = this.activeRoute.snapshot.url[1].path;
      this.productService.getProductsInCategory(+type , page , size)
        .subscribe(categoryPage => {
          this.page = categoryPage.page;
          this.title = categoryPage.category;
      })
    } */
  }

  filterProductsByType(products: ProductInfo[], type: number) {
      if(products != null)
        return products.filter(x => x.categoryType == type);
  }

}
