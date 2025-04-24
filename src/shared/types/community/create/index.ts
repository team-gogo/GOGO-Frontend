export interface CommunityCreateFormData {
  title: string;
  content: string;
  gameCategory:
    | 'SOCCER'
    | 'BASKET_BALL'
    | 'BASE_BALL'
    | 'VOLLEY_BALL'
    | 'BADMINTON'
    // | 'LOL'
    | 'ETC';
  image?: File;
}
