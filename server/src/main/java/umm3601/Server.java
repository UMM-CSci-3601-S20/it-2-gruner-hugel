package umm3601;

import java.util.Arrays;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import io.javalin.Javalin;
import umm3601.notes.NoteController;
import umm3601.users.UserController;

public class Server {

  private static MongoDatabase database;

  public static void main(String[] args) {

    // Get the MongoDB address and database name from environment variables and
    // if they aren't set, use the defaults of "localhost" and "dev".
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    String databaseName = System.getenv().getOrDefault("MONGO_DB", "dev");

    // Setup the MongoDB client object with the information we set earlier
    MongoClient mongoClient = MongoClients.create(MongoClientSettings.builder()
        .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr)))).build());

    // Get the database
    database = mongoClient.getDatabase(databaseName);

    // Initialize dependencies here ...
    NoteController noteController = new NoteController(database);
    UserController userController = new UserController(database);

    Javalin server = Javalin.create().start(4567);

    // Get all notes
    server.get("api/notes", noteController::getNotes);

    // Get all users
    server.get("api/users", userController::getUsers);

    // Get a specific user
    server.get("api/users/:id", userController::getUserById);

    // Get all notes for a particular user
    server.get("api/notes/user/:id", noteController::getUserNotes);

    server.get("api/notes/user/:id/save", noteController::getUserSaveNotes);

    // Add new note to a specific user's doorboard
    server.post("api/notes/user/:id/new", noteController::addNote);

    server.post("api/notes/user/:id/saveNew", noteController::newSaveNote);

    // Get a single note (:id here refers to note id)
    server.get("api/notes/:id", noteController::getNoteByID);

    // Edit an existing note
    server.post("api/notes/edit/:userID/:id", noteController::editNote);

    server.post("api/notes/saveMade/:userID/:id", noteController::saveMadeNote);

    // Delete a note
    server.delete("api/notes/:id", noteController::deleteNote);

    // Pin a note
    server.post("api/notes/pin/:id", noteController::pinNote);

    // Unpin a note
    server.post("api/notes/unpin/:id", noteController::unpinNote);

    server.exception(Exception.class, (e, ctx) -> {
      ctx.status(500);
      ctx.json(e); // you probably want to remove this in production
    });
  }
}
