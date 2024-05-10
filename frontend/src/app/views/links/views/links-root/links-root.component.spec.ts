import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksRootComponent } from './links-root.component';

describe('LinksRootComponent', () => {
  let component: LinksRootComponent;
  let fixture: ComponentFixture<LinksRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinksRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
