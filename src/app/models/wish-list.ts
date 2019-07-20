export interface IWishList {
  readonly uuid?: string;
  readonly creatorUuid?: string;
  description: string;
  readonly groupUuid?: string;
  rank: number;
  icon: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
