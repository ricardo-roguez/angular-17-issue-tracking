import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueConfirmDialogComponent } from './issue-confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: IssueConfirmDialogComponent;
  let fixture: ComponentFixture<IssueConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueConfirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
