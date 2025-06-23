import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent implements OnInit {
  @Input() user!: User;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  onClose(): void {
    document.body.style.overflow = 'auto';
    this.close.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  getMapUrl(): string {
    const { lat, lng } = this.user.address.geo;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }

  getFullAddress(): string {
    const { street, suite, city, zipcode } = this.user.address;
    return `${street}, ${suite}\n${city}, ${zipcode}`;
  }

  formatWebsite(website: string): string {
    return website.startsWith('http') ? website : `https://${website}`;
  }
}