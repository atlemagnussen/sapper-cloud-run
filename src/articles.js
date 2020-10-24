import all from "./articles/*.md";

export const find = (id) => {
    const file = `${id}.md`;
    const art = all.find((a) => a.filename == file);
    return art;
}