import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

interface IssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-issue-report',
  standalone: true,
  imports: [ClarityModule, ReactiveFormsModule],
  templateUrl: './issue-report.component.html',
  styleUrl: './issue-report.component.css',
})
export class IssueReportComponent {
  @Output() formClose = new EventEmitter();

  private issueService = inject(IssuesService);

  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true }),
    type: new FormControl('', { nonNullable: true }),
  });

  addIssue(): void {
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    this.closeform();
  }

  closeform(): void {
    this.formClose.emit();
  }
}
