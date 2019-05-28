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

var ll = new LinkedList();

ll.addToHead(100);
ll.addToHead(200);
ll.addToHead(300);

var myLL = new LinkedList();

myLL.addToTail(10);
myLL.addToTail(20);
myLL.addToTail(30);

myLL.addToHead(100);

console.log(util.inspect(myLL.tail.prev.prev.prev, false, null, true /* enable colors */))