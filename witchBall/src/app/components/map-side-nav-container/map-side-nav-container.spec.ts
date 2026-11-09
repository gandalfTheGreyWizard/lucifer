import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSideNavContainer } from './map-side-nav-container';

describe('MapSideNavContainer', () => {
  let component: MapSideNavContainer;
  let fixture: ComponentFixture<MapSideNavContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSideNavContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(MapSideNavContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
