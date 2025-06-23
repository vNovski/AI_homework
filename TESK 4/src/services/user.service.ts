import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  deleteUser(userId: number): void {
    const currentUsers = this.usersSubject.value;
    const filteredUsers = currentUsers.filter(user => user.id !== userId);
    this.usersSubject.next(filteredUsers);
  }

  getUsers(): User[] {
    return this.usersSubject.value;
  }
}