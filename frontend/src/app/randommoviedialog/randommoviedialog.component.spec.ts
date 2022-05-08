import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandommoviedialogComponent } from './randommoviedialog.component';

describe('RandommoviedialogComponent', () => {
  let component: RandommoviedialogComponent;
  let fixture: ComponentFixture<RandommoviedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandommoviedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandommoviedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
