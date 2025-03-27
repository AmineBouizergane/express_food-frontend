import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../../model/order.model';
import { Page } from '../../../model/page.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrl: './client-orders.component.css'
})
export class ClientOrdersComponent implements OnInit{
  
  orderPage$:Observable<Page<Order>> |null=null;
  currentButton: number = 1;
  constructor(private orderService:OrderService, private router:Router){
    
  }

  
  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void{
    this.orderPage$ = this.orderService.getAllOrderByClient();
    this.currentButton = 1;
  }

  getCurrentOrders(): void{
    this.orderPage$ = this.orderService.getCurrentOrderByClient();
    this.currentButton = 2;
  }

}
