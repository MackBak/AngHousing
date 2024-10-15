import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router"; // TODO: Check what this is!
import {HousingService} from "../housing.service";
import {HousingLocation} from "../housing-location";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent {

    housingLocation: HousingLocation | undefined;
    applyForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.maxLength(20)]],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
    });

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private housingService: HousingService) {
        const housingLocationId = Number(this.route.snapshot.params['id']);
        this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
            this.housingLocation = housingLocation
        })
    }

    getErrorMessage(controlName: string): string | null {
        const control = this.applyForm.get(controlName);

        if (control?.hasError('required')) {
            return 'This field is required!';
        }
        if (control?.hasError('maxlength') || control?.hasError('minlength')) {
            return 'Name can only be between 3 and 20 characters!';
        }
        if (control?.hasError('email')) {
            return 'Invalid email format!';
        }

        return null;
    }

    submitApplication() {
        if (this.applyForm.valid) {
            console.log('Form submitted', this.applyForm.value)
        }
    }

}
