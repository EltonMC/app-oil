import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrPage } from './form-err.page';

describe('FormErrPage', () => {
  let component: FormErrPage;
  let fixture: ComponentFixture<FormErrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormErrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
