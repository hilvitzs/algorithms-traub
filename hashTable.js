const util = require('util');

function HashTable(size) {
  this.buckets = Array(size);
  this.numBuckets = this.buckets.length;
}

function HashNode(key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next || null;
}

HashTable.prototype.hash = function(key) {
  let total = 0;
  for (let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i);
  }

  return total % this.numBuckets;
}

HashTable.prototype.insert = function(key, value) {
  let index = this.hash(key);
  // console.log(index);
  if (!this.buckets[index]) this.buckets[index] = new HashNode(key, value);
  else if (this.buckets[index].key === key) {
    this.buckets[index].value = value;
  }
  else {
    let currentNode = this.buckets[index];
    while (currentNode.next) {
      if (currentNode.next.key === key) {
        currentNode.next.value = value;
        return;
      }
      currentNode = currentNode.next;
    }
    currentNode.next = new HashNode(key, value);
  }  
}

HashTable.prototype.get = function(key) {
  let index = this.hash(key);
  if (!this.buckets[index]) return null;
  else {
    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) return currentNode.value;
      currentNode = currentNode.next;
    }
    return null;
  }
};

HashTable.prototype.retrieveAll = function() {
  let allNodes = [];
  for (let i = 0; i < this.numBuckets; i++) {
    let currentNode = this.buckets[i];
    while (currentNode) {
      allNodes.push(currentNode);
      currentNode = currentNode.next;
    }
  } 

  return allNodes;
}

let myHT = new HashTable(30);

// console.log(myHT); // { buckets: Array(30), numBuckets: 30 }

// console.log(myHT.hash('Becca')); // 12

myHT.insert('Dean', 'dean@gmail.com');
myHT.insert('Megan', 'megan@gmail.com');
myHT.insert('Dane', 'dane@gmail.com');
myHT.insert('Dean', 'deanmachine@gmail.com');
myHT.insert('Megan', 'megansmith@gmail.com');
myHT.insert('Dane', 'dane1010@outlook.com');
myHT.insert('Joe', 'joey@facebook.com');
myHT.insert('Samantha', 'sammy@twitter.com');

// console.log(util.inspect(myHT.buckets, false, null, true)); // Dean Index: 16, Megan Index: 8, Dane Index: 16 - next value of Dean

// console.log(myHT.get('Dean')); // deanmachine@gmail.com
// console.log(myHT.get('Megan')); // megansmith@gmail.com
// console.log(myHT.get('Dane')); // dane1010@gmail.com

console.log(util.inspect(myHT.retrieveAll(), false, null, true)); // Sam, Megan, Dean, Dane, Joe