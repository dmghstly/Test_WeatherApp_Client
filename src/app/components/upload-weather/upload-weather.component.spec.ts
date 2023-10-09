import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWeatherComponent } from './upload-weather.component';

describe('UploadWeatherComponent', () => {
  let component: UploadWeatherComponent;
  let fixture: ComponentFixture<UploadWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadWeatherComponent]
    });
    fixture = TestBed.createComponent(UploadWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
