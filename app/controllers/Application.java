package controllers;

import models.Comment;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;
import play.*;
import play.data.Form;
import play.libs.Json;
import play.mvc.*;

import views.html.*;

import java.util.List;

import static play.data.Form.form;

public class Application extends Controller {
    static final Form<Comment> commentForm = form(Comment.class);

    public static Result index() {
        return ok(index.render("TESTING"));
    }

    public static Result game() {
        return ok(game.render(commentForm));
    }

    public static Result newComment() {
        Form<Comment> filledCommentForm = commentForm.bindFromRequest();
        if(filledCommentForm.hasErrors()) {
            return badRequest(game.render(commentForm));
        }
        Comment comment = filledCommentForm.get();
        comment.save();
        return ok(game.render(commentForm));
    }

    public static Result commentList() {
        ObjectNode jsonResult = Json.newObject();
        ArrayNode commentsArray = jsonResult.arrayNode();
        jsonResult.put("comments", commentsArray);
        List<Comment> allComments = Comment.getCommentsNewestFirst();
        for(Comment comment : allComments){
            commentsArray.add(comment.getJson());
        }
        return ok(jsonResult);
    }

    public static Result newJSONComment() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String username = json.findPath("username").getTextValue();
            String message = json.findPath("message").getTextValue();
            if(username == null || message == null) {
                return badRequest("Missing parameter");
            } else {
                Comment comment = new Comment(username, message);
                comment.save();
                return ok();
            }
        }
    }
  
}
