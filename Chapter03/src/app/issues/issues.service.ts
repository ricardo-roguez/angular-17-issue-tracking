import { Injectable } from '@angular/core';
import { Issue } from './issue';
import { issues } from '../../assets/mock-issues';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issues = new BehaviorSubject<Issue[]>(issues);

  getPendingIssues(): Observable<Issue[]> {
    return this.issues.pipe(map(issue => issue.filter(issue => !issue.completed)))
  }

  createIssue(issue: Issue): void {
    const issuesList = this.issues.getValue();
    issue.issueNo = issuesList.length + 1;

    this.issues.next([...issuesList, issue]);
  }
}
