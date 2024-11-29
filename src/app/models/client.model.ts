export class Client {
    constructor(
        public uuid: string,
        public created_at: string,
        public shared_key: string,
        public name: string,
        public type: string,
        public email?: string,
        public phone?: string
    ) {}
}