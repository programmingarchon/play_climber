package controllers;

import models.Comment;
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
        return ok(game.render(Comment.getCommentsNewestFirst(), commentForm));
    }

    public static Result newComment() {
        Form<Comment> filledCommentForm = commentForm.bindFromRequest();
        List<Comment> allComments;
        if(filledCommentForm.hasErrors()) {
            allComments = Comment.getCommentsNewestFirst();
            return badRequest(game.render(allComments, commentForm));
        }
        Comment comment = filledCommentForm.get();
        comment.save();
        allComments = Comment.getCommentsNewestFirst();
        return ok(game.render(allComments, commentForm));
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
  
}
