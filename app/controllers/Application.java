package controllers;

import models.Comment;
import play.*;
import play.data.Form;
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
        return ok(game.render("", "", Comment.find.all()));
    }

    public static Result newComment() {
        Form<Comment> filledCommentForm = commentForm.bindFromRequest();
        Comment comment = filledCommentForm.get();
        comment.save();
        return ok(game.render(comment.getUsername(), comment.getMessage(), Comment.find.all()));
    }
  
}
