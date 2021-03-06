package models;

import org.codehaus.jackson.node.ObjectNode;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import play.libs.Json;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Entity
public class Comment extends Model {
    @Id
    private Long id;
    @Constraints.Required
    private String message;
    @Constraints.Required
    private String username;
    private Date postDate = new Date();
    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("hh:mm:ss");

    public static Finder<Long, Comment> find = new Finder<Long, Comment>(
            Long.class, Comment.class
    );

    public Comment() {}

    public Comment(String username, String message) {
        this.username = username;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSimpleDate() {
        return simpleDateFormat.format(getPostDate());
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public static List<Comment> getCommentsNewestFirst() {
        return Comment.find.orderBy("postDate desc").findList();
    }

    public ObjectNode getJson() {
        ObjectNode result = Json.newObject();
        result.put("username", getUsername());
        result.put("message", getMessage());
        result.put("postDate", getSimpleDate());
        return result;
    }

}
