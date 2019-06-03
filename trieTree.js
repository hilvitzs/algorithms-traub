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

    if (Object.keys(parent.children).length ||!chain.length) {
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