import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit{

  user$: Observable<User> | null=null;
  passwordForm: FormGroup;

  constructor(private userService:UserService, 
    private snackBar: MatSnackBar,
    private fb: FormBuilder){
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUserProfile();
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // Handle the form submission
      console.log(this.passwordForm.value);
      this.userService.updatePassword(this.passwordForm.get('newPassword')?.value).subscribe(
        response => {
          console.log('Update password successfully:', response);       
  
          this.openSnackBar('Your password has been updated successfully', 'Close');
        },
        error => {
          console.error('Error updating password:', error);
          
          this.openSnackBar('Problem will updating your password', 'Close');
        }
      );
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

}
