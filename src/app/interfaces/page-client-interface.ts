import { Client } from '../models/client.model';

export interface PageClient {
    total_elements: number;
    content: Client[];
}