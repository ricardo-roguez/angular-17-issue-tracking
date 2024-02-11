import { Component, input, effect, inject, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { IssueForm } from '../issue-form';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-edit',
  standalone: true,
  imports: [ClarityModule, ReactiveFormsModule],
  templateUrl: './issue-edit.component.html',
  styleUrl: './issue-edit.component.css',
})
export class IssueEditComponent {
  @Output() formClose = new EventEmitter();

  private issueService = inject(IssuesService);

  issue = input.required<Issue>();
  issueForm!: FormGroup<IssueForm>;

  constructor() {
    effect(() => this.buildForm(this.issue()));
  }

  saveIssue(): void {
    const issueToSave: Issue = {
      ...(this.issueForm.getRawValue() as Issue),
      issueNo: this.issue().issueNo,
    };

    this.issueService.updateIssue(issueToSave);
  }

  private buildForm(issue: Issue): void {
    this.issueForm = new FormGroup<IssueForm>({
      title: new FormControl(issue.title, {
        nonNullable: true,
        validators: Validators.required,
      }),
      description: new FormControl(issue.description, { nonNullable: true }),
      priority: new FormControl(issue.priority, {
        nonNullable: true,
        validators: Validators.required,
      }),
      type: new FormControl(issue.type, {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }
}
