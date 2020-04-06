package umm3601;

import java.util.Arrays;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import io.javalin.Javalin;
import umm3601.notes.NoteController;

public class Server {

  private static MongoDatabase database;

  public static void main(String[] args) {

    // Get the MongoDB address and database name from environment variables and
    // if they aren't set, use the defaults of "localhost" and "dev".
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    String databaseName = System.getenv().getOrDefault("MONGO_DB", "dev");

    // Setup the MongoDB client object with the information we set earlier
    MongoClient mongoClient = MongoClients.create(
      MongoClientSettings.builder()
      .applyToClusterSettings(builder ->
        builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
      .build());

    // Get the database
    database = mongoClient.getDatabase(databaseName);

    // Initialize dependencies here ...
    NoteController noteController = new NoteController(database);

    Javalin server = Javalin.create().start(4567);

    // List notes
    server.get("api/notes", noteController::getNotes);

    // Add new note
    server.post("api/notes/new", noteController::addNote);

    // Get a single note
    server.get("api/notes/:id", noteController::getNoteByID);

    // Edit an existing note
    server.post("api/notes/edit/:id", noteController::editNote);

    //Pin a note
    server.post("api/notes/pin/:id", noteController::pinNote);

    // Delete a note
    server.delete("api/notes/:id", noteController::deleteNote);

    server.exception(Exception.class, (e, ctx) -> {
      ctx.status(500);
      ctx.json(e); // you probably want to remove this in production
    });
  }
}
