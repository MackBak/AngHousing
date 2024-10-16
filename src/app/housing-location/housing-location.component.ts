import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from "../housing-location";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.css']
})


export class HousingLocationComponent implements OnInit {
  @Input() housingLocation!:HousingLocation;

  ngOnInit() {
    if (!this.housingLocation) {
      console.warn('### Housing location input is missing! ###')
    }
  }
}