export interface HomeProps {}
export interface HomeFlatlistProps {
  item: {
    thumbnail?: string;
    title?: string;
    first?: string;
    last?: string;
    city?: string;
    gender?: string;
    isStared?: boolean;
  };
  index: number;
}
