import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ClientService } from '../../../services/client.service';
import { Observable } from 'rxjs';
import { Client } from '../../../model/client.model';
import { Page } from '../../../model/page.model';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrl: './client-management.component.css'
})
export class ClientManagementComponent implements OnInit {
  clients$: Observable<Page<Client>> | null=null;
  currentPage: number = 0;

  constructor(private userService: UserService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clients$ = this.clientService.getAllClients(this.currentPage);
  }

  onStatusChange(userId: number, event: any): void {
    const status = event.target.checked;
    this.userService.enableUser(userId, status).subscribe(() => {   
      this.loadClients();
      console.log(`User ${userId} status updated to ${status}`);
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadClients();
  }
}
