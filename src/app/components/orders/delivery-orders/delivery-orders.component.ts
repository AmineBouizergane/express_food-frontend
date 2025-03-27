import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../model/page.model';
import { Order } from '../../../model/order.model';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrl: './delivery-orders.component.css'
})
export class DeliveryOrdersComponent implements OnInit{
  
  orderPage$:Observable<Page<Order>> |null=null;
  statusBadgeMap:any = environment.statusBadgeMap;

  constructor(private orderService:OrderService, private router:Router){
    
  }

  ngOnInit(): void {
    this.getOrderByDelivery();
  }

  getOrderByDelivery():void{   
    this.orderPage$ = this.orderService.getOrderByDelivery();
  }

  changeStatus(orderId: number, statusId:number) {
    this.orderService.changeOrderStatus(orderId, statusId)
      .subscribe(
        response => {
          console.log('Status updated successfully:', response);
          this.getOrderByDelivery();
        },
        error => {
          console.error('Error updating status:', error);
        }
      );
    } 

}
