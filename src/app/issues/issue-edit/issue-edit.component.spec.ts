import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IssueEditComponent } from './issue-edit.component';
import { Issue } from '../interfaces/issue';
import { IssuesService } from '../issues.service';

const mockedIssue: Issue = {
  title: 'Issue To edit',
  description: 'Dummy description',
  issueNo: 99,
  priority: 'high',
  type: 'Documentation'
};

describe('IssueEditComponent', () => {
  let component: IssueEditComponent;
  let fixture: ComponentFixture<IssueEditComponent>;
  let compiled: HTMLElement;
  let issueServiceSpy: jasmine.SpyObj<IssuesService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('IssuesService', ['updateIssue']);

    await TestBed.configureTestingModule({
      imports: [IssueEditComponent, BrowserAnimationsModule],
      providers: [{ provide: IssuesService, useValue: spy }],
    }).compileComponents();

    issueServiceSpy = TestBed.inject(IssuesService) as jasmine.SpyObj<IssuesService>;

    fixture = TestBed.createComponent(IssueEditComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('issue', mockedIssue);
    spyOn(component.formClose, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should contain an issueForm property with', () => {
    it('the title form control', () => {
      const titleControl = component.issueForm.controls.title;
      expect(titleControl).toBeTruthy();
      expect(titleControl.hasValidator(Validators.required)).toBe(true);
      expect(titleControl.value).toBe(mockedIssue.title);
    });
    it('the description form control', () => {
      const descriptionControl = component.issueForm.controls.description;
      expect(descriptionControl).toBeTruthy();
      expect(descriptionControl.hasValidator(Validators.required)).toBe(false);
      expect(descriptionControl.value).toBe(mockedIssue.description);
    });

    it('the priority form control', () => {
      const priorityControl = component.issueForm.controls.priority;
      expect(priorityControl).toBeTruthy();
      expect(priorityControl.hasValidator(Validators.required)).toBe(true);
      expect(priorityControl.value).toBe(mockedIssue.priority);
    });

    it('the type form control', () => {
      const typeControl = component.issueForm.controls.type;
      expect(typeControl).toBeTruthy();
      expect(typeControl.hasValidator(Validators.required)).toBe(true);
      expect(typeControl.value).toBe(mockedIssue.type);
    });
  });

  describe('should constains a form in the html with', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('the form tag', () => {
      fixture.detectChanges();
      expect(compiled.querySelector('form')).toBeTruthy();
    });

    it('the title control', () => {
      expect(
        compiled.querySelector('[formControlName="title"]')
      ).toBeTruthy();
    });

    it('the description control', () => {
      expect(
        compiled.querySelector('[formControlName="description"]')
      ).toBeTruthy();
    });

    it('the priority control', () => {
      expect(
        compiled.querySelector('[formControlName="priority"]')
      ).toBeTruthy();
    });

    it('the type control', () => {
      expect(compiled.querySelector('[formControlName="type"]')).toBeTruthy();
    });

    it('the submit button', () => {
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
    });

    it('the cancel button', () => {
      expect(
        compiled.querySelector('button[type="button"]')?.textContent
      ).toBe('Cancel');
    });
  });

  it('should call to IssueService when user update the issue and close the form', () => {
    const expectedIssue: Issue = {
      title: 'new Title',
      description: 'new Description',
      type: 'Bug',
      priority: 'low',
      issueNo: -1
    };

    component.issueForm.patchValue(expectedIssue);
    component.saveIssue();
    expect(issueServiceSpy.updateIssue).toHaveBeenCalledWith({
      ...expectedIssue,
      issueNo: mockedIssue.issueNo
    });

    expect(component.formClose.emit).toHaveBeenCalled();
  });
});
