package umm3601.users;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Updates.set;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.mongojack.JacksonCodecRegistry;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

public class UserController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private final MongoCollection<User> userCollection;

  public UserController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(User.class);
    userCollection = database.getCollection("users").withDocumentClass(User.class)
    .withCodecRegistry(jacksonCodecRegistry);
  }
  // UPDATE WHEN THIS STUB IS COMPLETED
  // I'm putting this here in case we want to have a list of users when navigating to a user profile.
  public void getUsers(Context ctx) {

  }

  public void getUserById(Context ctx) {

  }
  // UPDATE WHEN THIS STUB IS COMPLETED
  // While I don't thing we actually sold this feature, it would be nice if we were able to implement this as well.
  public void addUser(Context ctx) {

  }
  // UPDATE WHEN THIS STUB IS COMPLETED
  // Same as above, with the added note that we'll need to establish a getUserById method and route to do this one.
  public void deleteUser(Context ctx) {

  }
  // UPDATE WHEN THIS STUB IS COMPLETED
  // This is probably lowest priority of the extras, but it would also be nice to be able to edit users if you make a typo or something.
  public void editUser(Context ctx) {

  }
}
