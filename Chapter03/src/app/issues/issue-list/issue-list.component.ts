import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClarityModule } from '@clr/angular';

import { IssuesService } from '../issues.service';
import { IssueReportComponent } from '../issue-report/issue-report.component';
import { Issue } from '../issue';
import { IssueConfirmDialogComponent } from '../issue-confirm-dialog/issue-confirm-dialog.component';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css',
  imports: [ClarityModule, IssueReportComponent, IssueConfirmDialogComponent],
})
export class IssueListComponent {
  private issueService = inject(IssuesService);
  private issues$ = this.issueService.getPendingIssues();
  issues = toSignal(this.issues$, { requireSync: true });
  showReportIssue = false;
  selectedIssue = signal<Issue>({} as Issue);

  onCloseReport(): void {
    this.showReportIssue = false;
  }

  openReport(): void {
    this.showReportIssue = true;
  }

  onConfirm(confirmed: boolean): void {
    if (confirmed && this.selectedIssue().issueNo > 0) {
      this.issueService.completeIssue(this.selectedIssue());
    }
    this.selectedIssue.set({} as Issue);
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue.set(issue);
  }
}
