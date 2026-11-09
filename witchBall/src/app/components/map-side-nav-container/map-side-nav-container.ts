import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-map-side-nav-container',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './map-side-nav-container.html',
  styleUrl: './map-side-nav-container.scss',
})
export class MapSideNavContainer {
  urlEmitter = output<string>();
  getDataForm = new FormGroup({
    url: new FormControl(''),
  });

  getData() {
    this.urlEmitter.emit(this.getDataForm.value.url ? this.getDataForm.value.url : '');
  }
}
