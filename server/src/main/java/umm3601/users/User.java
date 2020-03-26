package umm3601.users;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class User {

  @ObjectId @Id
  public String _id;

  public String name;
  public String officeID;
  public String building;
  public String email;
}
