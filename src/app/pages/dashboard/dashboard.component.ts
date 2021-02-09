import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
import { State } from '../../interfaces/state';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../../styles/state.scss',
    './dashboard.component.scss',
  ]
})
export class DashboardComponent implements OnInit {
  public states: State[];
  public stateForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.maxLength(128), Validators.pattern(/^\S{3}.*$/)]],
    initials: [null, [Validators.required, Validators.maxLength(2), Validators.pattern(/^[A-Z]{2}$/)]]
  });
  public cityForm: FormGroup = this.formBuilder.group({
		name: [null, [Validators.required, Validators.maxLength(128), Validators.pattern(/^\S{3}.*$/)]],
		stateId: [null, Validators.required]
	});

  constructor(
    private stateService: StateService,
    private cityService: CityService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getStates();
  }

  private getStates(): void {
    this.stateService.getStates().subscribe(
      states => {
        this.states = states;
      }
    );
  }

  public submitState(): void {
    if (this.stateForm.status === 'VALID') {
      this.stateService.createState(this.stateForm.value).subscribe(
        () => {
          this.getStates();
          this.stateForm.setValue({ name: null, initials: null });
          alert('Estado criado com sucesso!');
        }
      )
    }
  }

  public submitCity(): void {
		if (this.cityForm.status === 'VALID') {
			this.cityService.createCity(this.cityForm.value).subscribe(
				() => {
          this.cityForm.setValue({ name: null, stateId: this.states[0].id })
					alert('Cidade criada com sucesso!');
				}
			);
		}
	}
}
