import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  findAll() {
    return [
      { tenantId: 1, content: 'First message' },
      { tenantId: 2, content: 'Second message' },
    ];
  }
}
