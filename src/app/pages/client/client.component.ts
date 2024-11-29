import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public totalElements: number = 0;
  public allClients: Client[] = [];
  public client: Client | null = null;
  public formSharedKey = this.formBuilder.group({
      sharedKey: ['', Validators.required]
  });

  public formCreateClient = this.formBuilder.group({
    shared_key: ['', Validators.required],
    name: ['', Validators.required],
    type: ['', Validators.required],
    phone: [''],
    email: [''],
});



  constructor(private clientService: ClientService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
     this.clientService.findAll().subscribe(resp => {
        this.allClients = resp.content;
        this.totalElements = resp.total_elements;
     });
  }

  findBySharedKey() {
    this.clientService.findBySharedKey(this.formSharedKey.value.sharedKey || '').subscribe(resp => {
      console.log(resp);
      this.client = resp;
    });
  }

  exportToSvc() {

    const header = Object.keys(this.allClients[0]).join(',');
    const rows = this.allClients.map(row => 
      Object.values(row).join(',')
    ).join('\n');
    
    const csvContent = header + '\n' + rows;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'clients.csv');
    link.click();

  }


}
