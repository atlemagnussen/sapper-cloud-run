import articles from "../articles/*.md";
const filepath = "./articles/articletree.json";
import fs from "fs";
import path from "path";

const absolutePath = path.resolve(filepath);

const load = async () => {
	return new Promise((resolve, reject) => {
		fs.readFile(absolutePath, (err, data) => {
			if (err)
				reject(err);
			const tree = JSON.parse(data);
			resolve(tree);
		});
	});
}
let tree;
export const getTree = async () => {
    if (!tree)
        tree = await load();
    return tree;
}
export const find = async (id) => {
    const node = await findNode(id);
    const file = `${id}.md`;
    const art = articles.find((a) => a.filename == file);
    if (art) {
        if (node) {
            art.name = node.name;
            art.desc = node.desc;
        }
    }
    return art;
}

export const findNode = async (id) => {
    const intTree = await getTree();
    const itemPath = findPath({children: intTree.nodes}, id);

    if (!itemPath)
        return false;
    if (!Array.isArray(itemPath) || itemPath.length === 0)
        return false;

    const last = itemPath.pop();
    return last;
}

const findPath = (root, id) => {
    const found = [];

    if (root.children && Array.isArray(root.children) && root.children.length > 0) {
        const children = root.children;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child.id === id) {
                found.push(child);
                return found;
            }
        }
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const grandChild = findPath(child, id);

            if (grandChild && Array.isArray(grandChild) && grandChild.length > 0) {
                found.push(child);
                found.push(...grandChild);
                return found;
            }
        }
    }
    return null;
}