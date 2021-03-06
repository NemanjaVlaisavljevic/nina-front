import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductCardDeckComponent } from './product-card-deck.component';

describe('ProductCardDeckComponent', () => {
  let component: ProductCardDeckComponent;
  let fixture: ComponentFixture<ProductCardDeckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
