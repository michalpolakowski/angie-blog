export interface IPost {
  pk: number;
  title: string;
  text: string;
  owner: string;
  co_creators: string;
  vote_set: Array<{id: number}>;
}
