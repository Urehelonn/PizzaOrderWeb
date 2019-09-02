import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';

export enum MessageType {
  Info = 'info',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Primary = 'primary',
  Secondary = 'secondary'
}

export class Message {
  id: number | string;
  msg: string;
  type: MessageType;
  timer?: boolean;
  countSeconds?: number;

  constructor(msg: string, type: MessageType, timer?: boolean, count?: number) {
    this.id = Math.floor(Math.random() * 1000000000 + 1);
    this.timer = timer;
    this.msg = msg;
    this.type = type;
    this.countSeconds = count;
  }
}

export interface MessageQueue {
  [key: string]: Message[];
}

const mq: MessageQueue = {
  info: []
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new BehaviorSubject<MessageQueue>(mq);
  private mq$ = this.subject.asObservable().pipe(distinctUntilChanged());

  constructor() {
  }

  get value() {
    return this.subject.value;
  }

  set(name: MessageType, message: Message) {
    const arr = this.value.hasOwnProperty(name) ? [...this.value[name], message] : [message];
    this.subject.next({...this.value, [name]: arr});
  }

  select<T>(name: MessageType): Observable<T> {
    // @ts-ignore
    return this.mq$.pipe(pluck(name));
  }

  unset(name: MessageType, msg: Message) {
    if (!this.value.hasOwnProperty(name)) {
      return;
    }

    const arr = this.value[name].filter(v => v.id !== msg.id);
    this.value[name] = arr;
    this.subject.next({...this.value});
  }
}
