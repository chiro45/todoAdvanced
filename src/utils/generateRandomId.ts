import { v4 as uuidv4 } from "uuid";

export const handleGenerateRandomId = () => {
  return `${uuidv4()}`;
};
