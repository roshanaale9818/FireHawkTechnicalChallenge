import { Component } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private modalService: ModalService) {}
  onShowModal() {
    this.modalService.showModal('');
    console.log(this.modalService.showModal('sdsdsdsdds'));
  }
  onCloseDialog() {
    this.modalService.hideModal();
  }
}
