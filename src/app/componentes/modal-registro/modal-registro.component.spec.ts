import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroComponent } from './modal-registro.component';

describe('ModalRegistroComponent', () => {
  let component: ModalRegistroComponent;
  let fixture: ComponentFixture<ModalRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
