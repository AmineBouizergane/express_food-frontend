import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../model/client.model';
import { UserRequest } from '../../model/userRequest.model';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  addUserForm: FormGroup;
  
  constructor(private clientService: ClientService, private fb: FormBuilder, private router: Router) { 
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      userName : ['', Validators.required],
      password : ['', Validators.required]
    });
   }

   saveUser(): void {
    if (this.addUserForm.valid) {
      const newClient : UserRequest = {
        firstName: this.addUserForm.value.firstName,
        lastName: this.addUserForm.value.lastName,
        birthDay: this.addUserForm.value.birthday,
        phoneNumber: this.addUserForm.value.phone,
        address: this.addUserForm.value.address,
        userName: this.addUserForm.value.userName,
        encryptedPassword: this.addUserForm.value.password,
        avatarUrl: null
      };
      this.clientService.addClient(newClient).subscribe(
        response => {
          console.log('Client deleted successfully:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error deleting client:', error);
        }
      );
    }
  }
}
