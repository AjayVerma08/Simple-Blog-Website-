import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let post_data = [
  {
    "id": 1,
    "title": "The Scientific Argument for Mastering One Thing at a Time",
    "body": "Many people, myself included, have multiple areas of life they would like to improve. For example, I would like to reach more people with my writing, to lift heavier weights at the gym, and to start practicing mindfulness more consistently. Those are just a few of the goals I find desirable and you probably have a long list yourself.............",
    "link": "https://jamesclear.com/master-one-thing",
    "author": "By James Clear"
  },
  {
    "id": 2,
    "title": "Let's Talk About The American Dream",
    "body": "A few months ago I wrote about what it means to stay gold — to hold on to the best parts of ourselves, our communities, and the American Dream itself. But staying gold isn’t passive. It takes work. It takes action. It takes hard conversations that ask us to confront where we’ve been, where we are, and who we want to be.",
    "link": "https://blog.codinghorror.com/lets-talk-about-the-american-dream/",
    "author": "By Jeff Atwood"
  }
]

function update (){

}

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index", {post_data});  
});

app.get('/post/:id', (req,res) => {
    const post = post_data.find(p => p.id === parseInt(req.params.id));
    res.render("post", { post });
})

app.get("/new_post", (req, res) => {
  res.render('new_post');
});

app.post("/new_post", (req, res) => {
  try {
      const new_post = {
      id: post_data.length + 1,
      author: req.body.author,
      title: req.body.title,
      body: req.body.content,
    }
  post_data.push(new_post)
  res.redirect('/');
  }  catch (error) {
    console.error(error);
  }
});


app.get("/edit/:id", (req, res) => {
  const post = post_data.find(p => p.id === parseInt(req.params.id));
  res.render("edit", { post })
})

app.post("/update/:id", (req, res) => {
  const post = post_data.find(p => p.id === parseInt(req.params.id));
  post.author = req.body.author;
  post.title = req.body.title;
  post.body = req.body.content;
  res.redirect("/");
})

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const index = post_data.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
    post_data.splice(index, 1);
    console.log(`Post with id ${postId} deleted.`);
  }
  res.redirect('/');

})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


