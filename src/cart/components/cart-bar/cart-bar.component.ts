import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, Subscription} from 'rxjs';
import {Message, MessageService, MessageType} from '../../../auth/shared/services/message.service';

@Component({
  selector: 'app-cart-bar',
  templateUrl: './cart-bar.component.html',
  styleUrls: ['./cart-bar.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0.6})),
      transition(':enter', [
        style({transform: 'translateY(-200px)', opacity: 0.6}),
        animate(
          '600ms cubic-bezier(1.000,0.000,0.000,1.000)',
          style({transform: 'translateY(0)', opacity: 1})
        )
      ]),
      transition(':leave', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate(
          '500ms cubic-bezier(1.000,0.000,0.000,1.000)',
          style({transform: 'translateY(-200px)', opacity: 0.6})
        ),
      ])
    ])
  ]
})
export class CartBarComponent implements OnInit, OnDestroy {
  items: number;
  message$: Observable<Message[]>;
  subMsg: Subscription;

  constructor(private msgService: MessageService) {
    this.items = 0;
  }

  ngOnInit() {
    this.message$ = this.msgService.select<Message[]>(MessageType.PlaceNewOrder);
    this.subMsg = this.message$.subscribe();
  }

  ngOnDestroy(): void {
    this.subMsg.unsubscribe();
  }

}
