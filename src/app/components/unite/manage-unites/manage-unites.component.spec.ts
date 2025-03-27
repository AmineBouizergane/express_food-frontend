import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUnitesComponent } from './manage-unites.component';

describe('ManageUnitesComponent', () => {
  let component: ManageUnitesComponent;
  let fixture: ComponentFixture<ManageUnitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUnitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageUnitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
