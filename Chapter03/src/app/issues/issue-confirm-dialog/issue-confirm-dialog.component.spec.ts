import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueConfirmDialogComponent } from './issue-confirm-dialog.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmDialogComponent', () => {
  let component: IssueConfirmDialogComponent;
  let fixture: ComponentFixture<IssueConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IssueConfirmDialogComponent,
        ClarityModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('issueNo', 3);
    spyOn(component.confirm, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title with the issue number', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-title')?.textContent).toBe(
      ' Resolve Issue #3 '
    );
  });

  describe('on agree function', () => {
    beforeEach(() => component.agree());

    it('should emit true on confirm event', () => {
      expect(component.confirm.emit).toHaveBeenCalledWith(true);
    });

    it('should set closeModal property as true', () => {
      expect(component.closeModal()).toBe(true);
    });
  });

  describe('on disagree function', () => {
    beforeEach(() => component.disagree());

    it('should emit false on confirm event', () => {
      expect(component.confirm.emit).toHaveBeenCalledWith(false);
    });

    it('should set closeModal property as true', () => {
      expect(component.closeModal()).toBe(true);
    });
  });
});
