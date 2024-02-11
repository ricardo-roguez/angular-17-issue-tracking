import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';

import { IssueReportComponent } from './issue-report.component';
import { IssuesService } from '../issues.service';
import { issues } from '../../../assets/mock-issues';
import { Issue } from '../issue';

const suggestionsMock = [issues[0], issues[1]];

describe('IssueReportComponent', () => {
  let component: IssueReportComponent;
  let fixture: ComponentFixture<IssueReportComponent>;
  let issueServiceSpy: jasmine.SpyObj<IssuesService>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('IssuesService', [
      'getSuggestions',
      'createIssue',
    ]);
    await TestBed.configureTestingModule({
      imports: [IssueReportComponent, BrowserAnimationsModule],
      providers: [{ provide: IssuesService, useValue: spy }],
    }).compileComponents();

    issueServiceSpy = TestBed.inject(
      IssuesService
    ) as jasmine.SpyObj<IssuesService>;

    issueServiceSpy.getSuggestions.and.returnValue(of(suggestionsMock));

    fixture = TestBed.createComponent(IssueReportComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    spyOn(component.formClose, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constains a form in the html which', () => {
    it('should be rendered', () => {
      expect(compiled.querySelector('form')).toBeTruthy();
    });

    it('should contain the title control', () => {
      expect(compiled.querySelector('[formControlName="title"]')).toBeTruthy();
    });

    it('should contain the description control', () => {
      expect(
        compiled.querySelector('[formControlName="description"]')
      ).toBeTruthy();
    });

    it('should contain the priority control', () => {
      expect(
        compiled.querySelector('[formControlName="priority"]')
      ).toBeTruthy();
    });

    it('should contain the type control', () => {
      expect(compiled.querySelector('[formControlName="type"]')).toBeTruthy();
    });

    it('should contain the submit button', () => {
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
    });

    it('should contain the cancel button', () => {
      expect(compiled.querySelector('button[type="button"]')?.textContent).toBe(' Cancel ');
    });

    it('should hide the suggestions if there are empty', () => {
      component.suggestions.set([]);
      fixture.detectChanges();
      expect(compiled.querySelector('[data-test="suggestions"]')).toBeFalsy();
    });

    it('should display the suggestions if there are filled', () => {
      component.suggestions.set([issues[0]]);
      fixture.detectChanges();
      expect(compiled.querySelector('[data-test="suggestions"]')).toBeTruthy();
    });
  });

  describe('should contain an issueForm property with', () => {
    it('the title form control', () => {
      const titleControl = component.issueForm.controls.title;
      expect(titleControl).toBeTruthy();
      expect(titleControl.hasValidator(Validators.required)).toBe(true);
    });
    it('the description form control', () => {
      const descriptionControl = component.issueForm.controls.description;
      expect(descriptionControl).toBeTruthy();
      expect(descriptionControl.hasValidator(Validators.required)).toBe(false);
    });

    it('the priority form control', () => {
      const priorityControl = component.issueForm.controls.priority;
      expect(priorityControl).toBeTruthy();
      expect(priorityControl.hasValidator(Validators.required)).toBe(true);
    });

    it('the type form control', () => {
      const typeControl = component.issueForm.controls.type;
      expect(typeControl).toBeTruthy();
      expect(typeControl.hasValidator(Validators.required)).toBe(true);
    });
  });

  it('should call to getSuggestions when title changes', () => {
    const titleControl = component.issueForm.controls.title;
    titleControl.setValue('the title');
    expect(issueServiceSpy.getSuggestions).toHaveBeenCalledWith('the title');
    expect(component.suggestions()).toEqual(suggestionsMock);
  });

  describe('addIssue', () => {
    it('should mark the form as touched if is not valid and not call to createIssue', () => {
      component.issueForm.patchValue({
        title: 'hello'
      });

      component.addIssue();
      expect(component.issueForm.valid).toBeFalse();
      expect(component.issueForm.touched).toBeTrue();
      expect(issueServiceSpy.createIssue).not.toHaveBeenCalled();
    });

    it('should call to createIssue in service when form is valid', () => {
      component.issueForm.patchValue({
        title: 'hello',
        description: 'description',
        priority: 'hig',
        type: 'type'
      });

      component.addIssue();
      expect(component.issueForm.valid).toBeTrue();
      expect(issueServiceSpy.createIssue).toHaveBeenCalledWith(
        component.issueForm.getRawValue() as Issue
      );
      expect(component.formClose.emit).toHaveBeenCalled();
    });
  });
  it('should close the form', () => {
    component.closeform();
    expect(component.formClose.emit).toHaveBeenCalled();
  });
});
