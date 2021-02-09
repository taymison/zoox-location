import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { State } from "src/app/interfaces/state";
import { StateService } from "src/app/services/state.service";

@Component({
	selector: 'app-state',
	templateUrl: './state.component.html',
	styleUrls: [
		'../../styles/state.scss',
		'./state.component.scss'
	]
})
export class StateComponent implements OnInit {
	public stateId: string;
	public state: State;
	public stateForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.maxLength(128), Validators.pattern(/^\S{3}.*$/)]],
    initials: [null, [Validators.required, Validators.maxLength(2), Validators.pattern(/^[A-Z]{2}$/)]]
  });

	constructor(
		private activatedRoute: ActivatedRoute,
		private stateService: StateService,
		private formBuilder: FormBuilder,
		private router: Router
	) { }

	ngOnInit(): void {
		this.stateId = this.activatedRoute.snapshot.paramMap.get('stateId');

		this.stateService.getState(this.stateId).subscribe(
			state => {
				this.state = state;
				this.stateForm.setValue({ 
					name: this.state.name, 
					initials: this.state.initials 
				})
			}
		);
	}

	get title(): string {
		return this.state ? `Editar ${this.state?.name} (${this.state.initials})` : 'Editar';
	}

	public confirmDelete(): void {
		const confirmation: boolean = confirm('O estado e suas cidades serão excluídas. Você tem certeza?');

		if (confirmation) {
			this.stateService.deleteState(this.stateId).subscribe(
				() => { this.router.navigate(['../']); }
			);
		}
	}

	public submit(): void {
		if (this.stateForm.status === 'VALID') {
			this.stateService.updateState(this.stateId, this.stateForm.value).subscribe(
				state => {
					this.state.name = state.name;
					this.state.initials = state.initials;
					alert('Estado atualizado com sucesso!');
				}
			);
		}
	}
}
