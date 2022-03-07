import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountryDetailsComponent } from './edit-country-details.component';

describe('EditCountryDetailsComponent', () => {
  let component: EditCountryDetailsComponent;
  let fixture: ComponentFixture<EditCountryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCountryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
