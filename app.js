function Node(data, left = null, right = null) {
    return {
        data, left, right
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

    return {
        root,
        sortedArray,
        buildTree,
        insertNode,
        deleteNode,
        find
    };
}

const t = Tree([1, 2, 4, 3, 5, 6, 8, 7]);
t.buildTree(t.sortedArray);
t.insertNode(t.root, 9)
console.log(t.deleteNode(t.root, 1));
console.log(t.find(t.root, 8));
