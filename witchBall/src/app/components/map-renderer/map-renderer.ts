import { Component, AfterViewInit, inject } from '@angular/core';
import {MapboxOverlay} from '@deck.gl/mapbox';
import { ScatterplotLayer, GeoJsonLayer } from '@deck.gl/layers';
import { Layer, Deck } from '@deck.gl/core';
import mapboxgl, { GeoJSONFeature } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MapSideNavContainer } from '../../components/map-side-nav-container/map-side-nav-container';
import { HttpClient } from '@angular/common/http';
import { Shapes } from './map-renderer.dto';

@Component({
  selector: 'app-map-renderer',
  imports: [
    MatSidenavModule,
    MapSideNavContainer
  ],
  templateUrl: './map-renderer.html',
  styleUrl: './map-renderer.scss',
})
export class MapRenderer implements AfterViewInit {
  map?: mapboxgl.Map;
  httpClient = inject(HttpClient);
  deckInstance?: MapboxOverlay;
  //deckInstance?: Deck;
  layers: Layer[] = [];
  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      accessToken: environment.accessToken,
      center: [88.363892, 22.572645],
      zoom: 11
    });

    this.map.once('load', () => {
      this.layers.push(
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
      );
      this.deckInstance = new MapboxOverlay({
        interleaved: true,
        layers: this.layers
      });
      this.map?.addControl(this.deckInstance);
    });
  }

  async urlDataPull(url: string) {
    const getHeaders = {
      "ContentType": "application/json"
    }
    console.log('url in renderer is ', url);
    await this.httpClient.get<GeoJSONFeature>(url, { headers: getHeaders }).subscribe(
      (data: GeoJSONFeature) => {
        const polygonLayer = new GeoJsonLayer<GeoJSONFeature>({
          id: 'geojson',
          data: data,
          getLineColor: [255, 0, 125],
          getLineWidth: 20,
          lineWidthMinPixels: 1,
          pickable: true
        });
        console.log(polygonLayer);
        this.layers.push(polygonLayer);
        this.deckInstance?.setProps({ layers: this.layers });
        console.log(data);
    },
    (err) => {
        console.log(err);
      },
      );
  }
}
