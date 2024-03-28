import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
    projectId: "jdx0zf81",
    dataset: "production",
    useCdn: true,
    apiVersion: "2024-03-26",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source)

export default client;