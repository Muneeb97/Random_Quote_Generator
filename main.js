const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteLink = document.getElementById('link');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const instagramBtn = document.getElementById('instagram');
const quotelinkBtn = document.getElementById('quote_button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader_circle');

function Reveal_Ring() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function Remove_Ring() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl =   `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

function InstaQuote() {
  const instaUrl = `https://www.instagram.com`;
  window.open(instaUrl, '_blank');
}

function GoToLink() {
  const gotoUrl = quoteLink.innerText;
  window.open(gotoUrl, '_blank');
}

async function getQuote() {
  Reveal_Ring();
  const Prox_link = 'https://cors-anywhere.herokuapp.com/';
  //'http://quotes.stormconsultancy.co.uk/random.json'
  const Api_link =
  'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(Prox_link + Api_link);
    const data = await response.json();

    if (data.quoteAuthor === '') {
      authorText.innerText = 'Nobody';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    quoteLink.innerText = data.quoteLink;
    
    Remove_Ring();
  } catch (error) {
    getQuote();
    console.log('whoops no quote');
  }
}


newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
instagramBtn.addEventListener('click',InstaQuote);
quotelinkBtn.addEventListener('click',GoToLink);

getQuote();



