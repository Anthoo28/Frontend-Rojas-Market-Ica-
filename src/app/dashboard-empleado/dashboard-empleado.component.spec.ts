import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmpleadoComponent } from './dashboard-empleado.component';

describe('DashboardEmpleadoComponent', () => {
  let component: DashboardEmpleadoComponent;
  let fixture: ComponentFixture<DashboardEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEmpleadoComponent]
    });
    fixture = TestBed.createComponent(DashboardEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
