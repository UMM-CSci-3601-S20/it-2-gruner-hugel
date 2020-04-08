export interface Note {
  _id: string;

  // our notes need the user id to associate themselves with the proper user's doorboard
  user_id: string;
  body: string;
  pinned: string;
}
