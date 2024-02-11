import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IssueForm } from '../issue-form';

@Component({
  selector: 'app-issue-edit',
  standalone: true,
  imports: [],
  templateUrl: './issue-edit.component.html',
  styleUrl: './issue-edit.component.css',
})
export class IssueEditComponent {
  issueForm!: FormGroup<IssueForm>;
}
