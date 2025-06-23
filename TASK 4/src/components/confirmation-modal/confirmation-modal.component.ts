import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() confirmButtonType: 'danger' | 'primary' = 'primary';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit(): void {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  onConfirm(): void {
    document.body.style.overflow = 'auto';
    this.confirm.emit();
  }

  onCancel(): void {
    document.body.style.overflow = 'auto';
    this.cancel.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}