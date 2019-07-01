export interface IGroup {
  readonly uuid?: string;
  readonly creatorUuid?: string;
  adminUuid?: string;
  name: string;
  icon: string;
  users?: any[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
