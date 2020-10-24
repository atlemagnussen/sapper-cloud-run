import { getTree } from "../../articles.js";

export const get = async (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json"
	});
	const contents = await getTree();
	res.end(JSON.stringify(contents));
};