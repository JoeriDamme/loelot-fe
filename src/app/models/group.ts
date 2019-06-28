export interface IGroup {
  readonly uuid?: string;
  readonly creatorUuid?: string;
  adminUuid?: string;
  name: string;
  icon: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
