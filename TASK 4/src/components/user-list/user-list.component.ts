import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UserModalComponent, ConfirmationModalComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isModalOpen = false;
  isLoading = true;
  error: string | null = null;
  
  // Confirmation modal state
  isConfirmationModalOpen = false;
  userToDelete: number | null = null;
  userNameToDelete: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userService.loadUsers().subscribe({
      next: (users) => {
        this.userService.setUsers(users);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load users. Please try again.';
        this.isLoading = false;
      }
    });
  }

  openUserModal(user: User): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

  deleteUser(event: Event, userId: number): void {
    event.stopPropagation();
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.userToDelete = userId;
      this.userNameToDelete = user.name;
      this.isConfirmationModalOpen = true;
    }
  }

  confirmDelete(): void {
    if (this.userToDelete !== null) {
      this.userService.deleteUser(this.userToDelete);
    }
    this.closeConfirmationModal();
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
    this.userToDelete = null;
    this.userNameToDelete = '';
  }

  getDisplayAddress(user: User): string {
    return `${user.address.city}, ${user.address.street}`;
  }

  formatWebsite(website: string): string {
    return website.startsWith('http') ? website : `https://${website}`;
  }
}