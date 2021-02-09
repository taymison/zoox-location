import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { City } from "src/app/interfaces/city";
import { State } from "src/app/interfaces/state";
import { CityService } from "src/app/services/city.service";
import { StateService } from "src/app/services/state.service";

@Component({
	selector: 'app-city',
	templateUrl: './city.component.html',
	styleUrls: [
		'../../styles/state.scss'
	]
})
export class CityComponent implements OnInit {
	public cityId: string;
	public city: City;
	public states: State[];
	public cityForm: FormGroup = this.formBuilder.group({
		name: [null, [Validators.required, Validators.maxLength(128), Validators.pattern(/^\S{3}.*$/)]],
		stateId: [null, Validators.required]
	});

	constructor(
		private activatedRoute: ActivatedRoute,
		private stateService: StateService,
		private cityService: CityService,
		private formBuilder: FormBuilder,
		private router: Router
	) { }

	ngOnInit(): void {
		this.cityId = this.activatedRoute.snapshot.paramMap.get('cityId');

		this.stateService.getStates().subscribe(
			states => {
				this.states = states;
			}
		);

		this.cityService.getCity(this.cityId).subscribe(
			city => {
				this.city = city;
				this.cityForm.setValue({
					name: this.city.name,
					stateId: this.city.stateId
				});
			}
		);
	}

	get title(): string {
		return this.city ? `Editar ${this.city.name}` : 'Editar';
	}

	public confirmDelete(): void {
		const confirmation: boolean = confirm('A cidade será excluída. Você tem certeza?');

		if (confirmation) {
			this.cityService.deleteCity(this.cityId).subscribe(
				() => { this.router.navigate(['../state', this.city.stateId]); }
			);
		}
	}

	public submit(): void {
		if (this.cityForm.status === 'VALID') {
			this.cityService.updateCity(this.cityId, this.cityForm.value).subscribe(
				city => {
					this.city.name = city.name;
					this.city.stateId = city.stateId;
					alert('Cidade atualizada com sucesso!');
				}
			);
		}
	}
}
