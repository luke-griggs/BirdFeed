import OpenAI from "openai";

const key = process.env.OPENAI_API_KEY ?? ""

const openai = new OpenAI(
    {
      apiKey: key
    }
);

export async function getbirdDescription(imageUrl: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "You are an expert birdwatcher. Please provide the response in plain JSON format, consisting of one object that includes the bird's name and a brief description of about 30-40 words. No additional formatting or decoration is needed. Here's an example: {\"name\": \"Blue Jay\", \"description\": \"The Blue Jay is a vibrant bird known for its striking blue feathers and distinctive crest. Highly intelligent and sociable.\"}" },
          {
            type: "image_url",
            image_url: {
              "url": imageUrl, 
            },
          },
        ],
      },
    ],
  });

  console.log(response.choices[0]);
  const jsonString = response.choices[0].message.content

  try {
    // Parsing the JSON string to a JavaScript object
    const jsonData = JSON.parse(jsonString!);
    return jsonData;

  } catch (error) {
    console.error("Failed to parse JSON", error);
    return null; 
  }
};
