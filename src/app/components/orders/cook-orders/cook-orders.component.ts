import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../model/page.model';
import { Order } from '../../../model/order.model';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cook-orders',
  templateUrl: './cook-orders.component.html',
  styleUrl: './cook-orders.component.css'
})
export class CookOrdersComponent implements OnInit{
  
  orderPage$:Observable<Page<Order>> |null=null;
  statusBadgeMap:any = environment.statusBadgeMap;

  constructor(private orderService:OrderService, private router:Router){
    
  }

  
  ngOnInit(): void {
    this.getOrdersByCook();
  }

  getOrdersByCook():void{
    this.orderPage$ = this.orderService.getOrderByCook();
  }

  changeStatus(orderId: number, statusId:number) {
    this.orderService.changeOrderStatus(orderId, statusId)
      .subscribe(
        response => {
          console.log('Status updated successfully:', response);
          this.getOrdersByCook();
        },
        error => {
          console.error('Error updating status:', error);
        }
      );
    } 

}
