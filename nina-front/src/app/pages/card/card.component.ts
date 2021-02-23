import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit , OnDestroy{

  page : any;
  title : string;
  private querySub : Subscription;
  private paramSub : Subscription;


  constructor(private productService : ProductService,
    private activeRoute : ActivatedRoute) {

     }

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
      if(this.activeRoute.snapshot.queryParamMap.get('page')){
        const currentPage = +this.activeRoute.snapshot.queryParamMap.get('page');
        const size = +this.activeRoute.snapshot.queryParamMap.get('size');
        this.getProds(currentPage , size);
      }else{
        this.getProds();
      }
  }

  getProds(page : number = 1 , size : number = 6){
    if(this.activeRoute.snapshot.url.length == 1){
      this.productService.getAllInPage(+page,  +size)
      .subscribe(page => {
          this.page = page;
          this.title = 'Choose your products';
      });
    }else{
      const type = this.activeRoute.snapshot.url[1].path;
      this.productService.getProductsInCategory(+type , page , size)
      .subscribe(categoryPage => {
        this.page = categoryPage.page;
        this.title = categoryPage.category;
      })
    }
  }

}
