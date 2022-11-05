import axios from "axios";

export default async function urlToStream(url: string) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  return new Blob([response.data]);
}
