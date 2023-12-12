import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReactComponentComponent} from './react-component.component';

describe('ReactComponentComponent', () => {
  let component: ReactComponentComponent;
  let fixture: ComponentFixture<ReactComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReactComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
