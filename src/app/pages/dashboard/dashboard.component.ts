import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../interfaces/state';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public states: State[];
  public stateForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.maxLength(128), Validators.pattern(/^\S{3}.*$/)]],
    initials: [null, [Validators.required, Validators.maxLength(2), Validators.pattern(/^[A-Z]{2}$/)]]
  });

  constructor(
    private stateService: StateService,
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

  public submit() {
    if (this.stateForm.status === 'VALID') {
      this.stateService.createState(this.stateForm.value).subscribe(
        () => {
          this.getStates();
          this.stateForm.setValue({ name: null, initials: null });
        }
      )
    }
  }
}
