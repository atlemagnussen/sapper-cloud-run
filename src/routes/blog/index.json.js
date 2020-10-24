//import tree from "../../articles/articletree.json";
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

export const get = async (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	const contents = await load();
	res.end(JSON.stringify(contents));
};