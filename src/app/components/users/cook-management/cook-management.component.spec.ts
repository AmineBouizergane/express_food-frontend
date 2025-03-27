import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookManagementComponent } from './cook-management.component';

describe('CookManagementComponent', () => {
  let component: CookManagementComponent;
  let fixture: ComponentFixture<CookManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
