import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookOrdersComponent } from './cook-orders.component';

describe('CookOrdersComponent', () => {
  let component: CookOrdersComponent;
  let fixture: ComponentFixture<CookOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
