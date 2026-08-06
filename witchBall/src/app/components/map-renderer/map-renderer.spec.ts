import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRenderer } from './map-renderer';

describe('MapRenderer', () => {
  let component: MapRenderer;
  let fixture: ComponentFixture<MapRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(MapRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
