import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageClient } from '../interfaces/page-client-interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Client } from '../models/client.model';

const base_url = 'http://localhost:8080/v1/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  findAll() {
    const url = `${ base_url }?page=${ 0 }&size=${ 30 }&search=${ "" }`;
    return this.http.get<PageClient>( url)
            .pipe(
              map( resp => {
                const clients = resp.content.map( 
                  client => new Client(client.uuid, client.created_at, client.shared_key, client.name, client.type, client.email, client.phone)  
                );
                return {
                  total_elements: resp.total_elements,
                  content: resp.content
                };
              })
            )
  }

  findBySharedKey(shared_key: string) {
    const url = `${ base_url }/by-shared-key/${ shared_key }`;
    console.log(url);
    return this.http.get<Client>(url);
  }
}
