class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
}
insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
        this.key = key;
        this.value = value;
    }
    /* If the tree already exists, then start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
        /* If the existing node does not have a left child, 
           meaning that if the `left` pointer is empty, 
           then we can just instantiate and insert the new node 
           as the left child of that node, passing `this` as the parent */
        if (this.left == null) {
            this.left = new BinarySearchTree(key, value, this);
        }
        /* If the node has an existing left child, 
           then we recursively call the `insert` method 
           so the node is added further down the tree */
        else {
            this.left.insert(key, value);
        }
    }
    // Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side */
    else {
        if (this.right == null) {
            this.right = new BinarySearchTree(key, value, this);
        }
        else {
            this.right.insert(key, value);
        }
    }
}
find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
        return this.value;
    }
    /* If the item you are looking for is less than the root 
       then follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key < this.key && this.left) {
        return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
       then follow the right child.
       If there is an existing right child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key > this.key && this.right) {
        return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
        throw new Error('Key Error');
    }
}
remove(key) {
    if (this.key == key) {
        if (this.left && this.right) {
            const successor = this.right._findMin();
            this.key = successor.key;
            this.value = successor.value;
            successor.remove(successor.key);
        }
        /* If the node only has a left child, 
           then you replace the node with its left child */
        else if (this.left) {
            this._replaceWith(this.left);
        }
        /* And similarly if the node only has a right child 
           then you replace it with its right child */
        else if (this.right) {
            this._replaceWith(this.right);
        }
        /* If the node has no children then
           simply remove it and any references to it 
           by calling "this._replaceWith(null)" */
        else {
            this._replaceWith(null);
        }
    }
    else if (key < this.key && this.left) {
        this.left.remove(key);
    }
    else if (key > this.key && this.right) {
        this.right.remove(key);
    }
    else {
        throw new Error('Key Error');
    }
}
_replaceWith(node) {
    if (this.parent) {
        if (this == this.parent.left) {
            this.parent.left = node;
        }
        else if (this == this.parent.right) {
            this.parent.right = node;
        }
        if (node) {
            node.parent = this.parent;
        }
    }
    else {
        if (node) {
            this.key = node.key;
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
        }
        else {
            this.key = null;
            this.value = null;
            this.left = null;
            this.right = null;
        }
    }
}
_findMin() {
    if (!this.left) {
        return this;
    }
    return this.left._findMin();
}
}


function newBST() {
    const BST =  new BinarySearchTree();
    BST.insert(3,3)
    BST.insert(1,1)
    BST.insert(4,4)
    BST.insert(6,6)
    BST.insert(9,9)
    BST.insert(2,2)
    BST.insert(5,5)
    BST.insert(7,7)
}

newBST();

function alphabet() {
    const BST = new BinarySearchTree();
    BST.insert('E',5);
    BST.insert('A',1);
    BST.insert('S',19);
    BST.insert('Y',25);
    BST.insert('Q',17);
    BST.insert('U',21);
    BST.insert('E',5);
    BST.insert('S',19);
    BST.insert('T',20);
    BST.insert('I',9);
    BST.insert('O',15);
    BST.insert('N',14);
}
alphabet();

function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}


function findBSTHeight(tree) {
    if (!tree) {
      return 0;
    }
    if (!tree.left && !tree.right) {
      return 1;
    }
    let height = 0;
    if (tree.right) {
      let rightHeight = 1 + findBSTHeight(tree.right);
      if (rightHeight > height) height = rightHeight;
    }
    if (tree.left) {
      let leftHeight = 1 + findBSTHeight(tree.left);
      if (leftHeight > height) height = leftHeight;
    }
    return height;
  }

//   function bst_height1(tree) {
//        return Math.max(tree.left && bst_height1(tree.left), 
//        tree.right && bst_height1(tree.right)) + 1; }

  // 6. Is it a BST?

function isItBSTree(tree) {
    if (!tree) return false;
  
    if (tree.right) {
      if (tree.right.key > tree.key) {
        isItBSTree(tree.right);
      } else {
        return false;
      }
    }
  
    if (tree.left) {
      if (tree.left.key < tree.key) {
        isItBSTree(tree.left);
      } else {
        return false;
      }
    }
  
    return true;
  }
  
  // console.log(isItBSTree(main()));
  
  // 7. 3rd largest node
  
  function findThirdNode(tree) {
    const height = findBSTHeight(tree);
    if (height < 2) {
      return null;
    } else if (height < 3) {
      if (tree.left && tree.right) {
        return tree.left.value;
      } else return null;
    } else if (height > 3) {
      return findThirdNode(tree.right);
    } else return tree.key;
  }
  
  // console.log(findThirdNode(main()));
  
  function isBalanced(tree) {
    if (!tree) return false;
    if (!tree.right && !tree.left) return true;
    if (Math.abs(findBSTHeight(tree.right) - findBSTHeight(tree.left)) > 1)
      return false;
    return true;
  }
  
  // console.log(isBalanced(main()));
  
  function checkBSTFromArray(arr1, arr2) {
    if (arr1.length !== arr2.length || arr1[0] !== arr2[0]) return false;
    if (arr1.length === 0 || arr2.length === 0) return true;
  
    const higher1 = [];
    const higher2 = [];
    const lower1 = [];
    const lower2 = [];
  
    for (let i = 1; i < arr1.length; i++) {
      if (arr1[i] > arr1[0]) {
        higher1.push(arr1[i]);
      } else {
        lower1.push(arr1[i]);
      }
    }
  
    for (let i = 1; i < arr2.length; i++) {
      if (arr2[i] > arr2[0]) {
        higher2.push(arr2[i]);
      } else {
        lower2.push(arr2[i]);
      }
    }
  
    return (
      checkBSTFromArray(higher1, higher2) && checkBSTFromArray(lower1, lower2)
    );
  }
  
  const arr1 = [3, 5, 4, 6, 1, 0, 2];
  const arr2 = [3, 1, 5, 2, 4, 6, 0];
  console.log(checkBSTFromArray(arr1, arr2));
