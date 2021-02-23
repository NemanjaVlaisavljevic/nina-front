import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order$ : Observable<Order>;

  constructor(private orderService : OrderService,
    private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.order$ = this.orderService.showOneOrder(+this.activateRoute.snapshot.paramMap.get('id'));
  }

}
