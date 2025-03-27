import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../model/page.model';
import { DeliveryPerson } from '../../../model/deliveryPerson.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CookService } from '../../../services/cook.service';
import { DeliveryService } from '../../../services/delivery.service';

@Component({
  selector: 'app-delivery-management',
  templateUrl: './delivery-management.component.html',
  styleUrl: './delivery-management.component.css'
})
export class DeliveryManagementComponent  implements OnInit {
  deliveryPerson$: Observable<Page<DeliveryPerson>> | null=null;
  currentPage: number = 0;
  addDeliveryForm: FormGroup;

  constructor(private userService: UserService, private deliveryService: DeliveryService, private fb: FormBuilder) { 
    this.addDeliveryForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.deliveryPerson$ = this.deliveryService.getAllDeliveriesWithPaggination(this.currentPage);
  }

  onStatusChange(userId: number, event: any): void {
    const status = event.target.checked;
    this.userService.enableUser(userId, status).subscribe(() => {   
      this.loadDeliveries();
      console.log(`User ${userId} status updated to ${status}`);
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadDeliveries();
  }

  saveDelivery(): void {
    if (this.addDeliveryForm.valid) {
      const newDelivery : DeliveryPerson = {
        firstName: this.addDeliveryForm.value.firstName,
        lastName: this.addDeliveryForm.value.lastName,
        birthDay: this.addDeliveryForm.value.birthday,
        phoneNumber: this.addDeliveryForm.value.phone,
        address: this.addDeliveryForm.value.address,
        avatarUrl: null,
        isActivated: true
      };
      this.deliveryService.addDelivery(newDelivery).subscribe(() => {
        // Refresh the cook list or handle the response as needed
      this.currentPage = 0;
      this.loadDeliveries();
      });
    }
  }
}
