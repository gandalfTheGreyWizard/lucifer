import { Component, AfterViewInit } from '@angular/core';
import {MapboxOverlay} from '@deck.gl/mapbox';
import {ScatterplotLayer} from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map-renderer',
  imports: [],
  templateUrl: './map-renderer.html',
  styleUrl: './map-renderer.scss',
})
export class MapRenderer implements AfterViewInit {
  map?: mapboxgl.Map;

  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      accessToken: environment.accessToken,
      center: [88.363892, 22.572645],
      zoom: 11
    });

    this.map.once('load', () => {
      const deckOverlay = new MapboxOverlay({
        interleaved: true,
        layers: [
          new ScatterplotLayer({
            id: 'deckgl-circle',
            data: [
              {position: [88.363892, 22.572645]}
            ],
            getPosition: d => d.position,
            getFillColor: [255, 0, 0, 100],
            getRadius: 1000,
            beforeId: 'waterway-label' // In interleaved mode render the layer under map labels
          })
        ]
      });
      this.map?.addControl(deckOverlay);
    });
  }
}
