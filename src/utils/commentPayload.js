

export class CommentPayload {
    constructor({id, text, date, author, to = null, children = [], attachedFiles = []}) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.author = author;
        this.children = children;
        this.attachedFiles = attachedFiles;
        this.to = to;
    }
}

