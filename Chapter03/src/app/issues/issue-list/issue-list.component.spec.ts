import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { IssueListComponent } from './issue-list.component';
import { IssuesService } from '../issues.service';
import { issues } from '../../../assets/mock-issues';
import { Issue } from '../issue';

const pendingIssuesMock = issues.filter(issue => !issue.completed);

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let issueServiceSpy: jasmine.SpyObj<IssuesService>;
  let compiled: HTMLElement;

  beforeEach(async () => {
      const spy = jasmine.createSpyObj('IssuesService', [
        'getPendingIssues',
        'completeIssue',
      ]);

    await TestBed.configureTestingModule({
      imports: [IssueListComponent, BrowserAnimationsModule],
      providers: [{ provide: IssuesService, useValue: spy }],
    }).compileComponents();


    issueServiceSpy = TestBed.inject(IssuesService) as jasmine.SpyObj<IssuesService>;
    issueServiceSpy.getPendingIssues.and.returnValue(of(pendingIssuesMock));

    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store the issuesList into issues property', () => {
    expect(component.issues()).toBe(pendingIssuesMock);
  });

  describe('when showReportIssue is false', () => {
    beforeEach(() => {
      component.showReportIssue.set(false);
      fixture.detectChanges();
    })

     it('should render the datagrid', () => {
       expect(compiled.querySelector('clr-datagrid')).toBeTruthy();
     });

    it('should hide the app-issue-report ', () => {
      expect(compiled.querySelector('app-issue-report ')).toBeFalsy();
    });
  });

  describe('when showReportIssue is true', () => {
    beforeEach(() => {
      component.showReportIssue.set(true);
      fixture.detectChanges();
    })

     it('should hide the datagrid', () => {
       expect(compiled.querySelector('clr-datagrid')).toBeFalsy();
     });
      it('should render the app-issue-report ', () => {
        expect(compiled.querySelector('app-issue-report ')).toBeTruthy();
      });
  });

  it('should display the modal when user select an issue and set the issueId', () => {
    component.selectedIssue.set(issues[0]);
    fixture.detectChanges();
    const confirmDialog = fixture.debugElement.query(By.css('app-issue-confirm-dialog')).componentInstance;
    expect(confirmDialog.issueNo()).toBe(issues[0].issueNo);
  });

  it('should close the report when user clicks on close report', () => {
    component.onCloseReport();
    expect(component.showReportIssue()).toBe(false);
  });

  it('should open the report when user clicks on open report', () => {
    component.openReport();
    expect(component.showReportIssue()).toBe(true);
  });

  describe('onConfirm', () => {
    it('should not call to issue service if confirmed is false but there is an issue selected', () => {
      component.selectedIssue.set(issues[0]);
      component.onConfirm(false);
      expect(issueServiceSpy.completeIssue).not.toHaveBeenCalled();
    });
    it('should not call to issue service if confirmed is true but there is no an issue selected', () => {
      component.selectedIssue.set({} as Issue);
      component.onConfirm(true);
      expect(issueServiceSpy.completeIssue).not.toHaveBeenCalled();
    });

    it('should call to issue service when confirmed is true and there is an issue selected and clear the selectedIssue', () => {
      component.selectedIssue.set(issues[0]);
      component.onConfirm(true);
      expect(issueServiceSpy.completeIssue).toHaveBeenCalledWith(issues[0]);
      expect(component.selectedIssue()).toEqual({} as Issue);
    });
  });

  it('should select an issue when user selects one', () => {
    component.selectedIssue.set({} as Issue);
    component.selectIssue(issues[1]);
    expect(component.selectedIssue()).toEqual(issues[1]);
  });
});
