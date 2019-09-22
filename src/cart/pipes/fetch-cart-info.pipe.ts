import {Pipe, PipeTransform} from '@angular/core';
import {Message} from '../../auth/shared/services/message.service';
import {Order} from '../../products/models/order.model';
import {OrderHelper} from '../../helpers/Order';


@Pipe({
  name: 'fetchCartInfo'
})
export class FetchCartInfoPipe implements PipeTransform {

  transform(msgs: Message[], args?: any): any {
    let total = 0;
    let orderNum = 0;
    if (msgs) {
      const orders: Order[] = [];
      console.log('msg in fc pipe: ', msgs);
      msgs.forEach(msg => {
        orders.push(JSON.parse(msg.msg));
      });
      console.log('Orders:', orders);

      orders.forEach(od => {
        total += +OrderHelper.totalPrice(od.products);
      });
      orderNum = orders.length;
      console.log('pipe num:', orderNum);
    } else {
      console.log('pipe total:', total);
      console.log('pipe num:', orderNum);
      console.log('no message passed to fc pipe');
    }
    return {total, orderNum};
  }
}
