import {Component, inject} from '@angular/core';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation} from "../housing-location";
import {CommonModule} from "@angular/common";
import { HousingService } from "../housing.service";
import {FormsModule} from "@angular/forms";


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, HousingLocationComponent, FormsModule],
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html',
})

export class HomeComponent {
    housingLocationList: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);

    filteredLocationList:HousingLocation[] = [];

    constructor() {
        this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
            this.housingLocationList = housingLocationList
            this.filteredLocationList = housingLocationList
        });
    }

    filterResults(text: string) {
        if (!text) this.filteredLocationList = this.housingLocationList;

        this.filteredLocationList = this.housingLocationList.filter(
            housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
        );
    }

    clearInput(inputElement: HTMLInputElement): void {
        inputElement.value = '';
        this.filterResults('');
    }

}
