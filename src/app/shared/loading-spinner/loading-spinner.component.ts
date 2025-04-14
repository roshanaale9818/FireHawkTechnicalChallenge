import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../loading.service';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  show = false;
  message = 'Loading...';
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loadingService.loading$.subscribe((status) => {
      this.show = status;
    });

    this.loadingService.message$.subscribe((msg) => {
      this.message = msg;
    });
  }
}
