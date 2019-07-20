import { WishListOfUserPipe } from './wish-list.pipe';

describe('WishListPipe', () => {
  it('create an instance', () => {
    const pipe = new WishListOfUserPipe();
    expect(pipe).toBeTruthy();
  });
});
