import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wishListOfUser',
})
export class WishListOfUserPipe implements PipeTransform {

  transform(values: any[], arg: string): any[] {
    return values.filter(value => value.creatorUuid === arg);
  }

}
