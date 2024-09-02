import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: User = {
    id: 1,
    name: 'John Connor',
    email: 'john.doe@example.com',
    profileImage: '',
    role: 'user',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-09-01T10:00:00Z'),
  };
}
