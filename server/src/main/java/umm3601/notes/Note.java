package umm3601.notes;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class Note {

  @ObjectId @Id
  public String _id;

  public String body;

  public String pinned;

}
