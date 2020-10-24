//import tree from "../../articles/articletree.json";
const filepath = "../../articles/articletree.json";
import fs from "fs";
const load = async () => {
	return new Promise((resolve, reject) => {
		fs.readFile(filepath, (err, data) => {
			if (err)
				 reject(err);
			console.log(data);
			const tree = JSON.parse(data);
			resolve(tree);
		});
	});
}

export const get = async (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	const contenst = await load();
	res.end(contents);
};