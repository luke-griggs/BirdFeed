import OpenAI from "openai";

const key = process.env.OPENAI_API_KEY ?? ""

const openai = new OpenAI(
    {
      apiKey: key
    }
);

export async function getbirdDescription() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              "url": "", // write procedure to get the s3 image url 
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
