intent("What does this app do", "What can i do here", 
       reply("This is a news project."));
intent("Who is the owner of this project", reply("Alvin kariuki."))

// intent("Start a command", (p)=>{
//     p.play({command: "testCommand"})
// })

const API_KEY = "b8a9de8eeece498bb777ade246a7c842";
let savedArticles = [];

// API endpoint for news by Source
intent('Get me news from $(source* (.*))', (p)=>{
    let NEWS_API_URL = 
        `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`
    
    // Modify API url
    if(p.source.value){
       NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join("-")}` 
    }
    
    //   Fetch data from API endpoint
    api.request(NEWS_API_URL, (error, response, body)=>{
        const { articles } = JSON.parse(body);
        
        if(!articles.length){
            p.play('Sorry, please try a difference source');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles});
        p.play(`Here are the (latest|recent)${p.source.value} news.`)
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
});

// API endpoint for news by Term
intent('What\'s up with $(term* (.*))', (p)=>{
    let NEWS_API_URL = 
        `https://newsapi.org/v2/everything?apiKey=${API_KEY}`
    
    // Modify API url
    if(p.term.value){
       NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}` 
    }
    
    //   Fetch data from API endpoint
    api.request(NEWS_API_URL, (error, response, body)=>{
        const { articles } = JSON.parse(body);
        
        if(!articles.length){
            p.play('Sorry, please try searching for something else');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) articles on${p.term.value}.`)
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
});



// News by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        
        if(p.C.value) {
           NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
        } else {
          p.play(`Here are the (latest|recent) news`);           
        }
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation); 
    });
});

/* Make Alan read the news */
const confirmation = context(()=>{
    intent('yes', async (p)=>{
        for(let i = 0; i < savedArticles.length; i++ ){
            // This will move the highlighter from one article to another
            p.play({command : 'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`)
        }
    })
    
    intent('no', async (p)=>{
        p.play('Sure, sounds good to me')
    })
})

// Opening article
intent('open (article|) (number|) $(number* (.*))', (p) =>{
    if(p.number.value){
        p.play({command: 'open', number: p.number.value, articles: savedArticles})
    }
})

intent('(go|) back', (p) =>{
    p.play('Sure, it should only take a moment');
    p.play({command : 'newHeadlines', articles: {}});
})