import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OrderStatus } from 'src/app/enums/OrderStatus';
import { UserRole } from 'src/app/enums/UserRole';
import { Order } from 'src/app/models/Order';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit , OnDestroy {
  page : any;
  orderStatus = OrderStatus;
  currentUser : JwtResponse;
  role = UserRole;

  selectedOrder: Order;

  querySub : Subscription;

	constructor(private userService: UserService, private modalService: NgbModal, config: NgbModalConfig,
		private orderService: OrderService, private activeRoute: ActivatedRoute, private toastrService: ToastrService) {
		config.backdrop = 'static';
		config.keyboard = false;
    }

	ngOnInit(): void {
		this.currentUser = this.userService.currentUserValue;
		this.querySub = this.activeRoute.queryParams.subscribe(data => {
			this.update();
		});
	}

	onCancelOk() {
		if(this.selectedOrder !== undefined) {
			this.cancel(this.selectedOrder);
		}
	}

	onFinishOk() {
		if(this.selectedOrder !== undefined) {
			this.finish(this.selectedOrder);
		}
	}

	showModal(content: any) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
	}

	update() : void{
		let nextPage = 1;
		let size = 10;
		if(this.activeRoute.snapshot.queryParamMap.get('page')){
			nextPage = +this.activeRoute.snapshot.queryParamMap.get('page');
			size = +this.activeRoute.snapshot.queryParamMap.get('size');
		}
		this.orderService.getOrdersInPage(nextPage , size).subscribe(data => {
			this.page = data;
		},
		error => {
			
		});
	}

	cancel(order : Order) : void {
		this.orderService.cancelOrder(order.orderId).subscribe(data => {
			if(data) {
				order.orderStatus = data.orderStatus;
				this.toastrService.success('Succesfully canceled order!');
			}
		},
		error => {
			this.toastrService.error('Error while canceling order!');
		});
	}

	finish(order : Order) : void {
		this.orderService.finishOrder(order.orderId).subscribe(data => {
			order.orderStatus = data.orderStatus;
			this.toastrService.success('Order successfully finished!');
		},
		error => {
			this.toastrService.success('Error while finishing order.');
		});
	}

	ngOnDestroy(): void {
		this.querySub.unsubscribe();
	}
}