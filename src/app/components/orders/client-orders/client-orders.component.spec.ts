import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrdersComponent } from './client-orders.component';

describe('ClientOrdersComponent', () => {
  let component: ClientOrdersComponent;
  let fixture: ComponentFixture<ClientOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
