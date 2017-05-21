
module.exports = (num) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'words.txt', false);
  xhr.send(null);
  var words = xhr.responseText.split('\n');

  let rnd;
  const randWords = [];
  for (let i=0; i<num; i++) {
    rnd = Math.floor(Math.random() * words.length);
    randWords.push(words[rnd]);
  }
  return randWords;
}