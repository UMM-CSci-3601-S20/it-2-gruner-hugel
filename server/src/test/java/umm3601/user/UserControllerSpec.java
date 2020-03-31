package umm3601.user;

import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.client.MongoClient;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.eclipse.jetty.security.UserDataConstraint;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;
import io.javalin.http.NotFoundResponse;

import umm3601.users.User;
import umm3601.users.UserController;


public class UserControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private UserController userController;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  static ObjectId importantUserId;
  static BasicDBObject importantUser;

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("Mongo_ADDR", "localhost");

    mongoClient = MongoClients.create(MongoClientSettings.builder().applyToClusterSettings
    (builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr)))).build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setting up the database
    MongoCollection<Document> userDocuments = db.getCollection("users");
    userDocuments.drop();
    List<Document> testUsers = new ArrayList<>();
    // Copy pasted test users from https://github.com/UMM-CSci-3601-S20/it-1-knights-who-say-ni
    testUsers.add(Document.parse("{\n" +
      "                    name: \"Rachael Johnson\",\n" +
      "                    officeID: \"1310\",\n" +
      "                    building: \"Science\",\n" +
      "                    email: \"rmjohns@morris.umn.edu\"\n" +
      "                }"));
    testUsers.add(Document.parse("{\n" +
      "                    name: \"Robert Denton\",\n" +
      "                    officeID: \"1523\",\n" +
      "                    building: \"Science\",\n" +
      "                    email: \"rdenton@morris.umn.edu\"\n" +
      "                }"));
    testUsers.add(Document.parse("{\n" +
      "                    name: \"Emily Bruce\",\n" +
      "                    officeID: \"1600\",\n" +
      "                    building: \"Camden\",\n" +
      "                    email: \"bruce088@morris.umn.edu\"\n" +
      "                }"));

      importantUserId = new ObjectId();
      new BasicDBObject("_id", importantUserId);
      importantUser = BasicDBObject.parse("{\n"
          +
      "                    name: \"Get ID test\",\n" +
      "                    officeID: \"1310\",\n" +
      "                    building: \"Science\",\n" +
      "                    email: \"rmjohns@morris.umn.edu\"\n" +
      "                }");
      userDocuments.insertMany(testUsers);
      userDocuments.insertOne(Document.parse(importantUser.toJson()));

      userController = new UserController(db);
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  // UPDATE WHEN THE STUBS ARE COMPLETED
  // List of tests (stubs) that we should have for our newly created user controller
  // everything after GetAllUsers() is not something we promised, so we shouldn't worry about them unless we have the time (assuming we even end up implementing them)


  // we want to make sure that we are actually getting all of the users for our user directory
  @Test
  public void GetAllUsers() throws IOException {
    // Creating the fake javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");
    userController.getUsers(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    assertEquals(db.getCollection("users").countDocuments(), JavalinJson.fromJson(result, User[].class).length);
  }

  @Test
  public void GetUserWithExistingID() throws IOException {

    mockReq.setMethod("GET");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/user/:id", ImmutableMap.of("id", importantUserId.toHexString()));
    userController.getUserById(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    User resultUser = JavalinJson.fromJson(result, User.class);

    assertEquals(resultUser._id, importantUserId.toHexString());
    assertEquals(resultUser.name, importantUser.get("name"));
  }

  @Test
  public void TryGetUserWithoutID() throws IOException {

    mockReq.setMethod("GET");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/user/:id", ImmutableMap.of("id", "some garbage that doesn't work"));

    assertThrows(BadRequestResponse.class, () -> {
      userController.getUserById(ctx);
    });
  }

  // if we end up allowing the addition of users, we'll want some testing for it
  @Test
  public void addUser() throws IOException {

  }

  // same deal here. If we end up implementing user deletion, we'll want this test
  @Test
  public void deleteUser() throws IOException {

  }

  // and again. If this ends up happening, we want to test it
  @Test
  public void editUser() throws IOException {

  }
}
