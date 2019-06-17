export interface IGroup {
  readonly uuid: string;
  readonly creatorUuid: string;
  adminUuid: string;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
