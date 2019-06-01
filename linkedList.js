const util = require('util')

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

LinkedList.prototype.addToHead = function(value) {
  var newNode = new Node(value, this.head, null);

  if (this.head) this.head.prev = newNode;
  else this.tail = newNode;
  this.head = newNode;
}

LinkedList.prototype.addToTail = function(value) {
  var newNode = new Node(value, null, this.tail);

  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
}

LinkedList.prototype.removeHead = function() {
  if (!this.head) return null;

  var val = this.head.value;
  this.head = this.head.next;
  if (this.head) this.head.prev = null;
  else this.tail = null;
  return val;
}

LinkedList.prototype.removeTail = function() {
  if (!this.tail) return null;

  var val = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) this.tail.next = null;
  else this.head = null;
  return val;
}

LinkedList.prototype.search = function(searchValue) {
  var currentNode = this.head;

  while (currentNode) {
    if (currentNode.value === searchValue) return currentNode.value;
    currentNode = currentNode.next
  }
  return null;
}

LinkedList.prototype.indexOf = function(value) {
  var counter = 0;
  var indexes = [];
  var currentNode = this.head;

  while (currentNode) {
    if (currentNode.value === value) {
      indexes.push(counter);
    }
    counter++;
    currentNode = currentNode.next;
  }

  return indexes;
}

// var ll = new LinkedList();

// ll.addToHead(100);
// ll.addToHead(200);
// ll.addToHead(300);

// var myLL = new LinkedList();

// console.log(util.inspect(ll, false, null, true /* enable colors */)); // 300 200 100 Head: 300 Tail: 100

// myLL.addToTail(10);
// myLL.addToTail(20);
// myLL.addToTail(30);

// myLL.addToHead(100);

// console.log(util.inspect(myLL.head, false, null, true /* enable colors */)) // 100

// myLL.removeHead();

// console.log(util.inspect(myLL.head, false, null, true /* enable colors */)); // 10

// var ll = new LinkedList();

// ll.addToHead(1000);
// ll.addToHead(2000);
// ll.addToTail(3000);

// ll.removeHead();
// console.log(util.inspect(ll.removeHead(), false, null, true)) // 1000

// var ll = new LinkedList();

// ll.addToHead('1');
// ll.addToHead('2');
// ll.addToHead('3');

// console.log(util.inspect(ll.removeTail(), false, null, true)); // '1'

// var myLL = new LinkedList();

// myLL.addToHead(123);
// myLL.addToHead(70);
// myLL.addToHead('hello');
// myLL.addToTail(19);
// myLL.addToTail('world');
// myLL.addToTail(20);

// console.log(util.inspect(myLL.search('ten'), false, null, true)); // null

var myLL = new LinkedList();

myLL.addToTail(1);
myLL.addToTail(5);
myLL.addToTail(3);
myLL.addToTail(5);
myLL.addToTail(8);
myLL.addToTail(7);
myLL.addToTail(5);

console.log(util.inspect(myLL.indexOf(5), false, null, true)); // [1, 3, 6]