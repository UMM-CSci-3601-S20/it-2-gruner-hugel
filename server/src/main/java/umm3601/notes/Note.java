package umm3601.notes;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class Note {

  @ObjectId @Id
  public String _id;

  // our notes need the user id to associate themselves with the proper user's doorboard
  public String user_id;
  public String body;

}
