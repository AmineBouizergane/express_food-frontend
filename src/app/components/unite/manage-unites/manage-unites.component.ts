import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../model/page.model';
import { Unite } from '../../../model/unite.model';
import { UniteService } from '../../../services/unite.service';
import { MessageResponse } from '../../../model/messageResponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-unites',
  templateUrl: './manage-unites.component.html',
  styleUrl: './manage-unites.component.css'
})
export class ManageUnitesComponent  implements OnInit {

  unitePage$:Observable<Unite[]> |null=null;
  message$:Observable<MessageResponse> |null=null;
  unitForm: FormGroup;
  editUnitForm: FormGroup;

  constructor(private uniteService:UniteService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
      
      this.unitForm = this.fb.group({
        name: ['', Validators.required]
      });
      
      this.editUnitForm = this.fb.group({
        name: ['', Validators.required],
      });
    
  }

  ngOnInit(): void {   
    this.getAllUnits();
  }

  getAllUnits() : void{
    this.unitePage$ = this.uniteService.getAllUnites();
  }

  onDelete(uniteId: number) {
    this.uniteService.deleteUnit(uniteId)
    .subscribe(
      response => {
        console.log('Product deleted successfully:', response);       
        this.getAllUnits(); 
        this.openSnackBar('The unit has been deleted successfully', 'Close');
      },
      error => {
        console.error('Error deleting product:', error);
        
        this.openSnackBar('You can\'t delete this unit  becouse she has an attached product', 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  addUnit(): void {
    if (this.unitForm.valid) {
      const newUnit: Unite = {
        uniteId: 0,
        label: this.unitForm.value.name
      };

      this.uniteService.addUnit(newUnit).subscribe(response => {
        console.log('Unit added successfully:', response);
        this.unitForm.patchValue({
          name: "",
        });
        this.getAllUnits();
      }, error => {
        console.error('Error adding unit:', error);
      });
    }
  }

  onEdit(unit: Unite) {
    this.editUnitForm.patchValue({
      name: unit.label,
    });
  }

  updateUnit(unitId:number) {
    if (this.editUnitForm.valid) {
      const updatedUnit: Unite = {
        uniteId: unitId,
        label: this.editUnitForm.value.name
      };

      this.uniteService.editUnit(updatedUnit).subscribe(response => {
        console.log('Unit has been updated successfully:', response);
        this.getAllUnits();
      }, error => {
        console.error('Error will updating unit:', error);
      });
    }
  }

}
