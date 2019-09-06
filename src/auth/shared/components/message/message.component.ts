import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Message, MessageService, MessageType} from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  message$: Observable<Message[]>;
  subscriptionMessage: Subscription;


  constructor(private messageService: MessageService) {
  }

  msgOnClickClose(msg: Message) {
    this.messageService.unset(MessageType.Info, msg);
  }

  ngOnInit() {
    this.message$ = this.messageService.select<Message[]>(MessageType.Info);
    this.subscriptionMessage = this.message$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptionMessage.unsubscribe();
  }
}
