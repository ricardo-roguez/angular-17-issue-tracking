import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClarityModule } from '@clr/angular';

import { IssuesService } from '../issues.service';
import { IssueReportComponent } from '../issue-report/issue-report.component';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css',
  imports: [ClarityModule, IssueReportComponent],
})
export class IssueListComponent {
  private issueService = inject(IssuesService);
  private issues$ = this.issueService.getPendingIssues();
  issues = toSignal(this.issues$, { requireSync: true });
  showReportIssue = false;

  onCloseReport(): void {
    this.showReportIssue = false;
  }

  openReport(): void {
    this.showReportIssue = true;
  }
}
