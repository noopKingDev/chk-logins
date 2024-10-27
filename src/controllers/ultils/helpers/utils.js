import { reset } from "../../modules/utils/helpers/index.js";
import { readFileSync, statSync } from "fs";

export const matchStringInFile = async (pathFile, string) => {
  const content = await readFileSync(pathFile, "utf8");
  const parseContent = content.split("\n");
  const result = parseContent.filter((line) => line.includes(string));

  return result
};

export const isFile = (pathFile) => {
  try {
    
    const result = statSync(pathFile);
    return result.isFile;
  } catch (error) {}
};
