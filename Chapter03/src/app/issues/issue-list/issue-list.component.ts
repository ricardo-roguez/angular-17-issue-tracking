import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClarityModule } from '@clr/angular';

import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css',
})
export class IssueListComponent {
  private issueService = inject(IssuesService);
  private issues$ = this.issueService.getPendingIssues();
  issues = toSignal(this.issues$, { requireSync: true });
}
