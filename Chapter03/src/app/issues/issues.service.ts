import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Issue } from './issue';
import { issues } from '../../assets/mock-issues';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issues$ = new BehaviorSubject<Issue[]>(issues);

  getPendingIssues(): Observable<Issue[]> {
    return this.issues$.pipe(map(issue => issue.filter(issue => !issue.completed)));
  }

  createIssue(issue: Issue): void {
    const issuesList = this.issues$.getValue();
    issue.issueNo = issuesList.length + 1;
    this.issues$.next([...issuesList, issue]);
  }

  completeIssue(issue: Issue): void {
    const issuesList = this.issues$.getValue();
    const selectedIssuse: Issue = {
      ...issue,
      completed: new Date()
    };
    const index = issuesList.findIndex(i => i === issue);
    issuesList[index] = selectedIssuse;
    this.issues$.next([...issuesList]);
  }

  getSuggestions(title: string): Observable<Issue[]> {
    if (title.length <= 3) {
       return of([]);
    }

    return this.issues$.pipe(
      map((issues: Issue[]) =>
        issues.filter(issue => this.containsTitle(issue, title))
      )
    );
  }

  private containsTitle(issue: Issue, title: string): boolean {
    return issue.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
  }
}
