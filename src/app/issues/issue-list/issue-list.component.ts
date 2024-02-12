import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClarityModule } from '@clr/angular';

import { IssuesService } from '../issues.service';
import { IssueReportComponent } from '../issue-report/issue-report.component';
import { Issue } from '../interfaces/issue';
import { IssueConfirmDialogComponent } from '../issue-confirm-dialog/issue-confirm-dialog.component';
import { IssueEditComponent } from '../issue-edit/issue-edit.component';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  templateUrl: './issue-list.component.html',
  imports: [
    ClarityModule,
    IssueReportComponent,
    IssueConfirmDialogComponent,
    IssueEditComponent,
  ],
})
export class IssueListComponent {
  private issueService = inject(IssuesService);
  issueList = toSignal(this.issueService.getPendingIssuesFromApi(), {
    initialValue: [],
  });

  showReportIssue = signal(false);
  showEditIssue = signal(false);
  selectedIssue = signal<Issue>({} as Issue);
  issueToEdit = signal<Issue>({} as Issue);

  onCloseReport(): void {
    this.showReportIssue.set(false);
  }

  openReport(): void {
    this.showReportIssue.set(true);
  }

  onConfirmDialog(confirmed: boolean): void {
    if (confirmed && this.selectedIssue().issueNo > 0) {
      this.issueService.completeIssue(this.selectedIssue());
    }
    this.selectedIssue.set({} as Issue);
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue.set(issue);
  }

  selectIssueToUpdate(issueToEdit: Issue): void {
    this.issueToEdit.set(issueToEdit);
    this.showEditIssue.set(true);
  }

  onCloseEdit(): void {
    this.showEditIssue.set(false);
  }
}
