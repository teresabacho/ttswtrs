import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentAndReturnComponent } from './shipment-and-return.component';

describe('ShipmentAndReturnComponent', () => {
  let component: ShipmentAndReturnComponent;
  let fixture: ComponentFixture<ShipmentAndReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentAndReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentAndReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
