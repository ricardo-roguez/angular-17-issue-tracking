import { TestBed } from '@angular/core/testing';

import { IssuesService } from './issues.service';
import { issues } from '../../assets/mock-issues';
import { Issue } from './issue';

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the pending issues when getPendingIssues is called', () => {
    const expectedIssues = issues;
    service.getPendingIssues().subscribe((pendingIssues) => {
      expect(pendingIssues).toEqual(expectedIssues);
    });
  });

  it('should create an issue when createIssue is called', () => {
    const newIssue: Issue = {
      title: 'New Issue',
      description: 'Description',
      issueNo: issues.length + 1,
      priority: 'high',
      type: 'Feature',
    };
    const expectedIssues = [...issues, newIssue];

    service.createIssue(newIssue);
    service.getPendingIssues().subscribe((pendingIssues) => {
      expect(pendingIssues).toEqual(expectedIssues);
    });
  });

  it('should complete an issue', () => {
    const issueToComplete = issues[1];

    service.completeIssue(issueToComplete);
    service
      .getPendingIssues()
      .subscribe((issues) =>
        expect(issues.findIndex((i) => i.issueNo === issueToComplete.issueNo)).toBe(-1)
      );
  });

  describe('getSuggestions', () => {
    it('should return an empty array of issues when title contains less than 3 ', () => {
      service.getSuggestions('aa')
        .subscribe(suggestions => expect(suggestions).toEqual([]));
    });

    it('should return an empty array of issues when suggestions was not found ', () => {
      service.getSuggestions('aaaa')
        .subscribe(suggestions => expect(suggestions).toEqual([]));
    });

    it('should return an empty array of issues when suggestions was not found ', () => {
      const expectedArray: Issue[] = [issues[1], issues[4]]
      service.getSuggestions('cust')
        .subscribe(suggestions => expect(suggestions).toEqual(expectedArray));
    });
  });
});
