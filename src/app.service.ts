import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

import * as TrelloNodeAPI from 'trello-node-api';
import TrelloNodeApi from "trello-node-api";

@Injectable()
export class AppService {

  private readonly trello: TrelloNodeApi;

  constructor(private readonly configService: ConfigService) {
    this.trello = new TrelloNodeAPI();
    this.trello.setApiKey(this.configService.get('API_KEY'));
    this.trello.setOauthToken(this.configService.get('TOKEN'));
  }

  async updateCard({ card, list, board }) {
    await this.trello.card.update(card.id, {
      idMembers: [this.configService.get('MEMBER')],
      due: this.getDue(),
      idList: list.id
    })
  }

  private getDue(): string {
    let date = new Date();
    date = new Date(date.getTime() + 86400000)
    return date.toString();
  }
}
