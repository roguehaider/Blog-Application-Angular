import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogSliderComponent } from './blog-slider.component';

describe('BlogSliderComponent', () => {
  let component: BlogSliderComponent;
  let fixture: ComponentFixture<BlogSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
