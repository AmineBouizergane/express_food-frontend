import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../model/page.model';
import { Cook } from '../../../model/cook.model';
import { UserService } from '../../../services/user.service';
import { CookService } from '../../../services/cook.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cook-management',
  templateUrl: './cook-management.component.html',
  styleUrl: './cook-management.component.css'
})
export class CookManagementComponent  implements OnInit {
  cook$: Observable<Page<Cook>> | null=null;
  currentPage: number = 0;
  addCookForm: FormGroup;

  constructor(private userService: UserService, private cookService: CookService, private fb: FormBuilder) { 
    this.addCookForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.loadCooks();
  }

  loadCooks(): void {
    this.cook$ = this.cookService.getAllCooksWithPaggination(this.currentPage);
  }

  onStatusChange(userId: number, event: any): void {
    const status = event.target.checked;
    this.userService.enableUser(userId, status).subscribe(() => {   
      this.loadCooks();
      console.log(`User ${userId} status updated to ${status}`);
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadCooks();
  }

  saveCook(): void {
    if (this.addCookForm.valid) {
      const newCook : Cook = {
        firstName: this.addCookForm.value.firstName,
        lastName: this.addCookForm.value.lastName,
        birthDay: this.addCookForm.value.birthday,
        phoneNumber: this.addCookForm.value.phone,
        address: this.addCookForm.value.address,
        avatarUrl: null,
        isActivated: true
      };
      this.cookService.addCook(newCook).subscribe(() => {
        // Refresh the cook list or handle the response as needed
      this.currentPage = 0;
      this.loadCooks();
      });
    }
  }
}

