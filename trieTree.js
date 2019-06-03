function Trie(letter = '') {
  this.value = letter;
  this.children = {};
  this.isWord = false;
}

Trie.prototype.add = function(word, node = this) {
  for (const letter of word) {
    if (node.children[letter]) {
      node = node.children[letter];
    } else {
      const newNode = new Trie(letter);
      node.children[letter] = newNode;
      node = newNode;
    };
  };

  node.isWord = true;
};

Trie.prototype.find = function(word, node = this) {
  let value = '';

  for (const letter of word) {
    if (node.children[letter]) {
      node = node.children[letter];
      value += letter;
    };
  };

  return value === word ? node : null;
};

Trie.prototype.remove = function(word = '', node = this) {
  if (!word) return null;

  const chain = [];

  for (const letter of word) {
    if (node.children[letter]) {
      chain.push(node);
      node = node.children[letter];
    } else {
      return null;
    };
  };

  if (Object.keys(node.children).length) {
    node.isWord = false;
    return node;
  };

  let child = chain.length ? chain.pop() : null;
  let parent = chain.length ? chain.pop() : null;

  while (true) {
    child && parent && delete parent.children[child.value];

    if (Object.keys(parent.children).length || !chain.length) {
      node.isWord = false;
      return node;
    };

    child = parent;
    parent = chain.pop();
  };
};

Trie.prototype.findWords = function(value = '', node = this.find(value), words = []) {
  Object.values(node.children).forEach(child => {
    if (child.isWord) words.push(value + child.value);
    child.findWords(value + child.value, child, words);
  });

  return words;
};

Trie.prototype.hasWord = function(word) {
  const node = this.find(word);
  return !!node && node.isWord;
};

let trie = new Trie();

// trie.add('add');
// trie.add('words');
// trie.add('please');

// console.log(trie.hasWord('add')); // true
// console.log(trie.hasWord('words')); // true
// console.log(trie.hasWord('please')); // true

// trie.add('trie');
// trie.add('javascript');
// trie.add('recursion');

// console.log(trie.findWords().sort()); // ['javascript', 'recursion', 'trie']

// trie.add('wow');
// trie.add('word');
// trie.add('wait');

// console.log(trie.findWords('wo').sort()); // ['word', 'wow']

trie.add('one');
trie.add('two');
trie.add('three');
trie.add('forty-two');

console.log(trie.findWords().sort()); // ['forty-two', 'one', 'three', 'two']

trie.remove('forty-two');

console.log(trie.findWords().sort()); // ['one', 'three', 'two']

// trie.add('one');
// trie.add('once');
// trie.add('only');

// console.log(trie.findWords().sort()); // ['once', 'one', 'only']

// trie.remove('onl');

// console.log(trie.findWords().sort()); // ['once', 'one', 'only']



