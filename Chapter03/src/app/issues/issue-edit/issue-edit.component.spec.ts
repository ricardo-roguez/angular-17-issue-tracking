import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueEditComponent } from './issue-edit.component';
import { Issue } from '../issue';
import { Validators } from '@angular/forms';

const mockedIssue: Issue = {
  title: 'Issue To edit',
  description: 'Dummy description',
  issueNo: 99,
  priority: 'high',
  type: 'Documentation'
}
fdescribe('IssueEditComponent', () => {
  let component: IssueEditComponent;
  let fixture: ComponentFixture<IssueEditComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueEditComponent);
    fixture.componentRef.setInput('issue', mockedIssue);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
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
});
