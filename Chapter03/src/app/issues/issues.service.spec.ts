import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { IssuesService } from './issues.service';
import { issues } from '../../assets/mock-issues';
import { Issue } from './issue';
import { of } from 'rxjs';

fdescribe('IssuesService', () => {
  let service: IssuesService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(IssuesService);
    httpClientSpy.get.and.returnValue(of(issues));
    service.getPendingIssuesFromApi().subscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the pending issues when getPendingIssues is called', () => {
    const expectedIssues = issues;
    service.getPendingIssuesFromApi().subscribe((pendingIssues) => {
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
    service.getPendingIssuesData().subscribe((pendingIssues) => {
      expect(pendingIssues).toEqual(expectedIssues);
    });
  });

  it('should complete an issue', () => {
    const issueToComplete = issues[1];

    service.completeIssue(issueToComplete);
    service
      .getPendingIssuesData()
      .subscribe((issues) =>
        expect(issues.findIndex((i) => i.issueNo === issueToComplete.issueNo)).toBe(-1)
      );
  });

  it('should update an issue', () => {
    const expectedIssue: Issue = {
      title: 'new Title',
      description: 'new Description',
      type: 'Bug',
      priority: 'high',
      issueNo: issues[2].issueNo,
    }

    service.updateIssue(expectedIssue);
    service
      .getPendingIssuesData()
      .subscribe((issues) => expect(issues[2]).toEqual(expectedIssue));
  });

  describe('getSuggestions', () => {
    it('should return an empty array of issues when title contains less than 3 ', () => {
      service.getSuggestions('cus')
        .subscribe(suggestions => expect(suggestions).toEqual([]));
    });

    it('should return an empty array of issues when suggestions was not found ', () => {
      service.getSuggestions('aaaa')
        .subscribe(suggestions => expect(suggestions).toEqual([]));
    });

    it('should return an array of issues when suggestions was found ', () => {
      const expectedArray: Issue[] = [issues[1], issues[4]]
      service.getSuggestions('cust')
        .subscribe(suggestions => expect(suggestions).toEqual(expectedArray));
    });
  });
});
