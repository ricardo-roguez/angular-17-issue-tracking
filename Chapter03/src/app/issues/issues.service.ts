import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Issue } from './issue';
import { issues } from '../../assets/mock-issues';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issues = new BehaviorSubject<Issue[]>(issues);

  getPendingIssues(): Observable<Issue[]> {
    return this.issues.pipe(map(issue => issue.filter(issue => !issue.completed)));
  }

  createIssue(issue: Issue): void {
    const issuesList = this.issues.getValue();
    issue.issueNo = issuesList.length + 1;
    this.issues.next([...issuesList, issue]);
  }

  completeIssue(issue: Issue): void {
    const issuesList = this.issues.getValue();
    const selectedIssuse: Issue = {
      ...issue,
      completed: new Date()
    };
    const index = issuesList.findIndex(i => i === issue);
    issuesList[index] = selectedIssuse;
    this.issues.next([...issuesList]);
  }
}
