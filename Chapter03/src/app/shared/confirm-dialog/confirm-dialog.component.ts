import { Component, EventEmitter, Output, input, signal } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  @Output() confirm = new EventEmitter<boolean>();
  issueNo = input.required<number>();

  closeModal = signal(false)

  agree() {
    this.confirm.emit(true);
    this.closeModal.set(true);
  }

  disagree() {
    this.confirm.emit(false);
    this.closeModal.set(true);
  }
}
