import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengembalianComponent } from './pengembalian.component';

describe('PengembalianComponent', () => {
  let component: PengembalianComponent;
  let fixture: ComponentFixture<PengembalianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PengembalianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengembalianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
