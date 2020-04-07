package umm3601.note;

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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;
import io.javalin.http.NotFoundResponse;

import umm3601.notes.Note;
import umm3601.notes.NoteController;

public class NoteControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private NoteController noteController;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  static ObjectId importantNoteId;
  static BasicDBObject importantNote;

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
    MongoClientSettings.builder()
    .applyToClusterSettings(builder ->
    builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
    .build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setup database
    MongoCollection<Document> noteDocuments = db.getCollection("notes");
    noteDocuments.drop();
    List<Document> testNotes = new ArrayList<>();
    testNotes.add(Document.parse("{\n" +
    "                    body: \"I wanna say something,\",\n" +
    "                    user_id: \"1310\",\n" +
    "                }"));
    testNotes.add(Document.parse("{\n" +
    "                    body: \"I wanna say something 2,\",\n" +
    "                    user_id: \"1311\",\n" +
    "                }"));
    testNotes.add(Document.parse("{\n" +
    "                    body: \"I wanna say something 3,\",\n" +
    "                    user_id: \"1312\",\n" +
    "                }"));

    importantNoteId = new ObjectId();
    importantNote = new BasicDBObject("_id", importantNoteId)
        .append("body", "Frogs are pretty cool");

    noteDocuments.insertMany(testNotes);
    noteDocuments.insertOne(Document.parse(importantNote.toJson()));

    noteController = new NoteController(db);
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void GetAllNotes() throws IOException {
    // Create our fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes");
    noteController.getNotes(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    assertEquals(db.getCollection("notes").countDocuments(), JavalinJson.fromJson(result, Note[].class).length);
  }

 @Test
  public void GetNoteWithExistentId() throws IOException {

    mockReq.setMethod("GET");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", importantNoteId.toHexString()));
    noteController.getNoteByID(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    Note resultNote = JavalinJson.fromJson(result, Note.class);

    assertEquals(resultNote._id, importantNoteId.toHexString());
    assertEquals(resultNote.body, importantNote.get("body"));
  }

  @Test
  public void GetNoteWithBadId() throws IOException {

    mockReq.setMethod("GET");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", "bad"));

    assertThrows(BadRequestResponse.class, () -> {
      noteController.getNoteByID(ctx);
    });
  }

  @Test
  public void GetNoteWithNonexistentId() throws IOException {

    mockReq.setMethod("GET");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", new ObjectId().toHexString()));

    assertThrows(NotFoundResponse.class, () -> {
      noteController.getNoteByID(ctx);
    });
  }

  @Test
  public void AddNote() throws IOException {

    String testNewNote = "{\"body\": \"Test Note\"}";

    mockReq.setBodyContent(testNewNote);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/new");

    noteController.addNote(ctx);

    assertEquals(201, mockRes.getStatus());

    String result = ctx.resultString();
    String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();
    assertNotEquals("", id);

    assertEquals(1, db.getCollection("notes").countDocuments(eq("_id", new ObjectId(id))));

    Document addedNote = db.getCollection("notes").find(eq("_id", new ObjectId(id))).first();
    assertNotNull(addedNote);
    assertEquals("Test Note", addedNote.getString("body"));
  }

  @Test
  public void AddNoteWithTooShortBody() throws IOException {
    String testNewNote = "{\"body\":\"x\"}";
    mockReq.setBodyContent(testNewNote);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/new");

    assertThrows(BadRequestResponse.class, () -> {
      noteController.addNote(ctx);
    });
  }

  @Test
  public void AddNoteWithTooLongBody() throws IOException {
    String testNewNote = "{\"body\":\"";
    for(int i = 0; i < 1000; i++) {
      testNewNote = testNewNote + "x";
    }
    testNewNote = testNewNote + "\"}";

    mockReq.setBodyContent(testNewNote);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/new");

    assertThrows(BadRequestResponse.class, () -> {
      noteController.addNote(ctx);
    });
  }

  @Test
  public void DeleteNote() throws IOException {
    assertEquals(1, db.getCollection("notes").countDocuments(eq("_id", importantNoteId)));

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", importantNoteId.toHexString()));
    noteController.deleteNote(ctx);

    assertEquals(200, mockRes.getStatus());
    assertEquals(ctx.resultString(), NoteController.DELETED_RESPONSE);

    // Note is no longer in the database
    assertEquals(0, db.getCollection("notes").countDocuments(eq("_id", importantNoteId)));
  }

  @Test
  public void DeletingANonexistentNoteHasNoEffect() throws IOException {
    ObjectId noSuchNoteId = new ObjectId();

    assertEquals(0, db.getCollection("notes").countDocuments(eq("_id", noSuchNoteId)));

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", noSuchNoteId.toHexString()));
    noteController.deleteNote(ctx);

    assertEquals(200, mockRes.getStatus());
    assertEquals(ctx.resultString(), NoteController.NOT_DELETED_RESPONSE);


    assertEquals(0, db.getCollection("notes").countDocuments(eq("_id", noSuchNoteId)));
  }


  @Test
  public void EditNote() throws IOException {
    String testUpdateNote = "{\"body\": \"This is the new body\"}";
    String id = importantNoteId.toHexString();

    mockReq.setBodyContent(testUpdateNote);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/edit/:id", ImmutableMap.of("id", id));

    noteController.editNote(ctx);

    assertEquals(200, mockRes.getStatus());

    String updatedBody = db.getCollection("notes").find(eq("_id", importantNoteId)).first().get("body").toString();
    assertEquals("This is the new body", updatedBody);
  }

  @Test
  public void EditNoteWithNonexistentID() throws IOException {
    String testUpdateNote = "{\"body\": \"This is the new body\"}";
    ObjectId wrongId = new ObjectId();

    mockReq.setBodyContent(testUpdateNote);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", wrongId.toHexString()));

    assertThrows(NotFoundResponse.class, () -> {
      noteController.editNote(ctx);
    });
    assertEquals(400, mockRes.getStatus());

    assertEquals(0, db.getCollection("notes").countDocuments(eq("_id", wrongId)));

  }

  @Test
  public void GetnotesByuser_id() throws IOException {

    // Set the query string to test with
    mockReq.setQueryString("user_id=1310");

    // Create our fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/user/1310");

    noteController.getUserNotes(ctx);

    String result = ctx.resultString();
    Note[] resultnotes = JavalinJson.fromJson(result, Note[].class);

    assertEquals(1, resultnotes.length); // There should be one user returned
    for (Note note : resultnotes) {
      assertEquals("1310", note.user_id); // There should be one with that id
    }
  }
}
