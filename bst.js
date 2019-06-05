const util = require('util');

function BST(value) {
  this.value = value;
  this.right = null;
  this.left = null;
}

BST.prototype.insert = function(value) {
  if (value <= this.value) {
    if (!this.left) this.left = new BST(value);
    else this.left.insert(value);
  } else if (value > this.value) {
    if (!this.right) this.right = new BST(value);
    else this.right.insert(value);
  }
};

BST.prototype.contains = function(value) {
  if (this.value === value) return true;
  if (value < this.value) {
    if (!this.left) return false;
    else return this.left.contains(value);
  } else if (value > this.value) {
    if (!this.right) return false;
    else return this.right.contains(value);
  }
};

BST.prototype.depthFirstTraversal = function(iteratorFunc, order) {
  if (order === 'pre-order') iteratorFunc(this.value);
  if (this.left) this.left.depthFirstTraversal(iteratorFunc, order);
  if (order === 'in-order') iteratorFunc(this.value);
  if (this.right) this.right.depthFirstTraversal(iteratorFunc, order);
  if (order === 'post-order') iteratorFunc(this.value);
};

BST.prototype.breadthFirstTraversal = function(iteratorFunc) {
  let queue = [this];
  while (queue.length) {
    let treeNode = queue.shift();
    iteratorFunc(treeNode);
    if (treeNode.left) queue.push(treeNode.left);
    if (treeNode.right) queue.push(treeNode.right);
  }
};

function log(value) {
  console.log(value);
}

BST.prototype.getMinVal = function() {
  if (this.left) return this.left.getMinVal();
  else return this.value;
};

BST.prototype.getMaxVal = function() {
  if (this.right) return this.right.getMaxVal();
  else return this.value;
};

let bst = new BST(50);

bst.insert(30);
bst.insert(70);
bst.insert(100);
bst.insert(60);
bst.insert(59);
bst.insert(20);
bst.insert(45);
bst.insert(35);
bst.insert(85);
bst.insert(105);
bst.insert(10);

// console.log(bst.right.left.left); // 59
// console.log(bst.left.right.left); // 35
// console.log(util.inspect(bst.right.right, false, null, true)) // 100 Left: 85 Right: 105

// console.log(bst.contains(50)); // true
// console.log(bst.contains(59)); // true
// console.log(bst.contains(10)); // true
// console.log(bst.contains(15)); // false

// bst.depthFirstTraversal(log, 'in-order'); // 10 20 30 35 45 50 59 60 70 85 100 105 - Least to Greatest
// bst.depthFirstTraversal(log, 'pre-order'); // 50 30 20 10 45 35 70 60 59 100 85 105 - Copy the BST
// bst.depthFirstTraversal(log, 'post-order'); // 10 20 35 45 30 59 60 85 105 100 70 50 - Safely delete nodes from a BST because it moves from the bottom and works its way up

// function log(value) {
//   console.log(value);
// }

// bst.breadthFirstTraversal(log); // 50 30 70 20 45 60 100 10 35 59 85 105

// function log(node) {
//   console.log(node.value);
// }

// console.log(bst.getMinVal()); // 10
// console.log(bst.getMaxVal()); // 105
