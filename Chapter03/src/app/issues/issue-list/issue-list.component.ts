import { Component, inject, signal } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css',
})
export class IssueListComponent {
  private issueService = inject(IssuesService);
  issues = signal<Issue[]>(this.issueService.getPendingIssues());
}
