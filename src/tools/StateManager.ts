import fs from "fs";
import path from "path";

const stateFilePath = path.resolve(__dirname, "state.json");

const readFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filePath: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, "utf8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const getFirstStartState = async (): Promise<boolean> => {
  try {
    const data = await readFile(stateFilePath);
    const state = JSON.parse(data);
    return state.firstStart;
  } catch (error) {
    console.error("Error reading state:", error);
    return false;
  }
};

export const setFirstStartState = async (state: boolean): Promise<void> => {
  try {
    const currentState = { firstStart: state };
    await writeFile(stateFilePath, JSON.stringify(currentState));
  } catch (error) {
    console.error("Error writing state:", error);
  }
};

export async function checkFirstStart(): Promise<boolean> {
  try {
    const response = await fetch("http://inclinus.fr:3189/users/firstStart", {
      method: "GET",
    });

    if (response.status === 200) {
      await setFirstStartState(true);
      return true;
    } else {
      await setFirstStartState(false);
      return false;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    await setFirstStartState(false);
    return false;
  }
}
