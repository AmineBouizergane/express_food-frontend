import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from '../../../model/page.model';
import { Order } from '../../../model/order.model';
import { environment } from '../../../../environments/environment';
import { Cook } from '../../../model/cook.model';
import { DeliveryPerson } from '../../../model/deliveryPerson.model';
import { CookService } from '../../../services/cook.service';
import { DeliveryService } from '../../../services/delivery.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from '../../../model/status.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit{
  
  orderPage$:Observable<Page<Order>> |null=null;
  cooks$:Observable<Cook[]> |null=null;
  deliveries$:Observable<DeliveryPerson[]> |null=null;
  status$:Observable<Status[]> |null=null;
  statusBadgeMap:any = environment.statusBadgeMap;
  selectedCook: number = 0;
  selectedDelivery: number = 0;
  filterStatus: number = 0;
  filterDeliveryDate: String = "";

  constructor(private orderService:OrderService, 
    private cookService: CookService,
    private deliveryService: DeliveryService,
    private snackBar: MatSnackBar){
  }

  
  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders():void{
    this.orderPage$ = this.orderService.getAllOrders();
    this.getCook();
    this.getDelivery();
  }

  getCook():void{
    this.cooks$ = this.cookService.getAllCooks();
  }

  getDelivery():void{
    this.deliveries$ = this.deliveryService.getAllDeliveries();
  }

  onShowDetails(cookId:number, deliveryId:number):void{
    this.selectedCook = cookId;
    this.selectedDelivery = deliveryId;
  }

  onSave(order : Order):void{
      // Call the service method to set the order to the selected cook
      if(order.status.statusId == 1){;
        this.orderService.setOrderToCook(order.orderId, this.selectedCook)
        .subscribe(response => {
          // Handle success response if needed
          console.log('Order set to cook successfully');
          this.getAllOrders();
          this.openSnackBar('The order #'+order.orderId+' has been setted to cook successfully', 'Close');
        }, error => {
          // Handle error response if needed
          console.error('Error setting order to cook:', error);
        });
      }else{
        this.orderService.setOrderToDelivery(order.orderId, this.selectedDelivery)
        .subscribe(response => {
          // Handle success response if needed
          console.log('Order set to delivery successfully');
          this.getAllOrders();
          this.openSnackBar('The order #'+order.orderId+' has been setted to delivery successfully', 'Close');
        }, error => {
          // Handle error response if needed
          console.error('Error setting order to delivery:', error);
        });
      }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  getCookId(order: Order): number {
    return order.cook?.id ?? 0;
  }

  getDeliveryId(order: Order): number {
      return order.deliveryPerson?.id ?? 0;
  }

  searchByFilter() {
    this.orderPage$ = this.orderService.getFiltredOrders(this.filterStatus, this.filterDeliveryDate);
  }
}
