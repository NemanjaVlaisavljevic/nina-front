import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserRole } from 'src/app/enums/UserRole';
import { Order } from 'src/app/models/Order';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order$ : Observable<Order>;
  role : UserRole = UserRole.USER;
  currentUserSubscription : Subscription;
  currentUser : JwtResponse;

  constructor(private orderService : OrderService, private userService : UserService,
    private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.order$ = this.orderService.showOneOrder(+this.activateRoute.snapshot.paramMap.get('id'));
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

}
