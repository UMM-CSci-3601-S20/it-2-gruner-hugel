package umm3601.notes;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Updates.set;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonCodecRegistry;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

public class NoteController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private final MongoCollection<Note> noteCollection;

  public static final String DELETED_RESPONSE = "deleted";
  public static final String NOT_DELETED_RESPONSE = "nothing deleted";

  public NoteController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(Note.class);
    noteCollection = database.getCollection("notes").withDocumentClass(Note.class)
        .withCodecRegistry(jacksonCodecRegistry);
  }

  public void getNoteByID(Context ctx) {
    String id = ctx.pathParam("id");
    Note note;

    try {
      note = noteCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested note id wasn't a legal Mongo Object ID.");
    }
    if (note == null) {
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.json(note);
    }
  }

  public void getNotes(Context ctx) {
    ctx.json(noteCollection.find(new Document()).into(new ArrayList<>()));
  }

  public void getUserNotes(Context ctx) {
    List<Bson> filters = new ArrayList<Bson>();

    if (ctx.queryParamMap().containsKey("user_id")) {
      filters.add(eq("user_id", ctx.queryParam("user_id")));
    }
    else {throw new NotFoundResponse("The query param map does not contain the specified user id");}

    ctx.json(noteCollection.find(filters.isEmpty() ? new Document() : and(filters)).into(new ArrayList<>()));
  }

  public void addNote(Context ctx) {

    Note newNote = ctx.bodyValidator(Note.class)
    .check((note) -> note.body.length() >= 2 && note.body.length() <= 300).get();

    noteCollection.insertOne(newNote);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newNote._id));
  }

  public void editNote(Context ctx) {
    String id = ctx.pathParamMap().get("id");

    Note newNote= ctx.bodyValidator(Note.class)
    .check((note) -> note.body.length() >= 2 && note.body.length() <= 300).get();
    String newBody = newNote.body;

    Note oldNote = noteCollection.findOneAndUpdate(eq("_id", new ObjectId(id)), set("body", newBody));

    if (oldNote == null) {
      ctx.status(400);
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.status(200);
      ctx.json(ImmutableMap.of("id", id));
    }
  }

  /**
   * Delete a note with a given id, if the id exists.
   *
   * If the id does not exist, do nothing.
   */
  public void deleteNote(Context ctx) {
    String id = ctx.pathParam("id");
    DeleteResult result = noteCollection.deleteOne(eq("_id", new ObjectId(id)));

    if (result.getDeletedCount() > 0) {
      ctx.result(DELETED_RESPONSE);
    } else {
      // Deleting a non-existent id is still considered a success.
      ctx.result(NOT_DELETED_RESPONSE);
    }
  }

  public void pinNote(Context ctx) {
    String id = ctx.pathParamMap().get("id");

    Note oldNote = noteCollection.findOneAndUpdate(eq("_id", new ObjectId(id)), set("pinned", "true"));

    if (oldNote == null) {
      ctx.status(400);
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.status(200);
      ctx.json(ImmutableMap.of("id", id));
    }
  }

  public void unpinNote(Context ctx) {
    String id = ctx.pathParamMap().get("id");

    Note oldNote = noteCollection.findOneAndUpdate(eq("_id", new ObjectId(id)), set("pinned", "false"));

    if (oldNote == null) {
      ctx.status(400);
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.status(200);
      ctx.json(ImmutableMap.of("id", id));
    }
  }
}
