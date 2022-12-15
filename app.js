function Node(data, left = null, right = null, parent = null) {
    return {
        data, left, right, parent
    }
}

function Tree(array) {
    const sortedArray = array.sort();
    const root = buildTree(sortedArray);

    function buildTree(arr) {
        if (arr.length == 0) return null;
        
        let mid = Math.floor(arr.length / 2);
        let rootNode = Node(arr[mid]);

        rootNode.left = buildTree(arr.slice(0, mid));
        rootNode.right = buildTree(arr.slice(mid + 1));

        if (rootNode.left) rootNode.left.parent = rootNode;
        if (rootNode.right) rootNode.right.parent = rootNode;

        return rootNode;
    }

    function insertNode(root, data) {
        if (root === null) {
            root = new Node(data);
            return root;
        }

        if (data < root.data) {
            root.left = insertNode(root.left, data);
        } else if (data > root.data) {
            root.right = insertNode(root.right, data);
        }

        return root;
    }

    function deleteNode(root, data) {
        if (root === null) return root;

        if (data < root.data) {
            root.left = deleteNode(root.left, data);
        } else if (data > root.data) {
            root.right = deleteNode(root.right, data);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            root.data = minimalValue(root.right);
            root.right = deleteNode(root.right, root.data);
        }

        return root;
    }

    // Function for getting inorder successor for a node.
    function minimalValue(root) {
        let minV = root.data;
        while (root.left !== null) {
            minV = root.left.data;
            root = root.left;
        }

        return minV;
    }

    function find(root, value) {
        if (root === null) return null;

        if (value == root.data) {
            return root;
        } else if (value < root.data) {
            return find(root.left, value);
        } else {
            return find(root.right, value);
        }
    }

    function levelOrder(fn) {
       if (!root) return [];

       const queue = [root];
       const result = [];

       while(queue.length) {
        let length = queue.length;
        result.push(queue.map(node => node.data));

        while(length--) {
            const node = queue.shift();
            if (fn) fn(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
       }
       return result;
    }

    function inorder(node = root, list = []) {
        if (node === null) return [];

        inorder(node.left, list);
        list.push(node.data);
        inorder(node.right, list);

        if (list.length > 0) return list;
    }

    function preorder(fn, node = root, list = []) {
        if (node === null) return [];

        fn ? fn(node) : list.push(node.data);
        preorder(fn, node.left, list);
        preorder(fn, node.right, list);

        return list;
    }

    function postorder(fn, node = root, list = []) {
        if (node === null) return [];

        postorder(fn, node.left, list);
        postorder(fn, node.right, list);
        fn ? fn(node) : list.push(node.data);

        return list;
    }

    function height(node = root) {
        if (node === null) return 0;

        const leftH = height(node.left);
        const rightH = height(node.right);

        return Math.max(leftH, rightH) + 1;
    }

    function depth(root, value, count = 0) {
        const node = find(root, value);

        if (node.parent === null) {
            return count;
        } else {
            return depth(root, node.parent.data, count + 1);
        }
    }

    function isBalanced(root) {
        if (root === null) return true;

        const leftH = height(root.left);
        const rightH = height(root.right);
        const diff = leftH > rightH ? leftH - rightH : rightH - leftH;

        if (diff > 1) return false;

        return isBalanced(root.left) && isBalanced(root.right);
    }

    function rebalance(root) {
        const inorderArr = inorder(root);
        const balancedTree = buildTree(inorderArr);

        return balancedTree;
    }

    return {
        root,
        sortedArray,
        buildTree,
        insertNode,
        deleteNode,
        find,
        levelOrder,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        isBalanced,
        rebalance
    };
}

const t = Tree([1, 2, 4, 3, 5, 6, 8, 7]);
t.buildTree(t.sortedArray);
console.log(t.isBalanced(t.root));
console.log(t.inorder());
console.log(t.preorder());
console.log(t.postorder());
t.insertNode(t.root, 123);
t.insertNode(t.root, 1234);
console.log(t.isBalanced(t.root));
console.log(t.rebalance(t.root));
console.log(t.isBalanced(t.rebalance(t.root)));
console.log(t.inorder());
console.log(t.preorder());
console.log(t.postorder());
