import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, switchMap, tap } from 'rxjs';
import { Issue } from './interfaces/issue';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private httpClient = inject(HttpClient);
  private pendingIssues$ = new BehaviorSubject<Issue[]>([]);
  private minLengthToSearchSuggestions = 3;

  getPendingIssuesData(): BehaviorSubject<Issue[]> {
    return this.pendingIssues$;
  }

  getPendingIssuesFromApi(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>('./assets/mock-issues.json')
      .pipe(
        map((issues: Issue[]) => issues.filter((issue) => !issue.completed)),
        tap((data) => this.pendingIssues$.next(data)),
        switchMap(() => this.pendingIssues$)
    );
  }

  createIssue(issue: Issue): void {
    const issuesList = this.pendingIssues$.getValue();
    issue.issueNo = issuesList.length + 1;
    this.pendingIssues$.next([...issuesList, issue]);
  }

  completeIssue(issue: Issue): void {
    const issuesList = [...this.pendingIssues$.getValue()];
    const index = this.findIssueIndexByIssueNo(issuesList, issue);
    issuesList.splice(index, 1);
    this.pendingIssues$.next([...issuesList]);
  }

  getSuggestions(title: string): Observable<Issue[]> {
    if (title.length <= this.minLengthToSearchSuggestions) {
      return of([]);
    }

    return this.pendingIssues$
      .pipe(
        map((issues: Issue[]) => issues.filter((issue) => this.containsTitle(issue, title)))
    );
  }

  updateIssue(issue: Issue): void {
    const issuesList = [...this.pendingIssues$.getValue()];
    const index = this.findIssueIndexByIssueNo(issuesList, issue);
    issuesList[index] = { ...issue };
    this.pendingIssues$.next([...issuesList]);
  }

  private findIssueIndexByIssueNo(issueList: Issue[], issue: Issue): number {
    return issueList.findIndex((i) => i.issueNo === issue.issueNo);
  }

  private containsTitle(issue: Issue, title: string): boolean {
    return issue.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
  }
}
