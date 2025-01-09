# Birdfeed
Birdfeed is a web application designed to assist birdwatchers in identifying birds they see in the wild


## Built With

Birdfeed is a next app built with React. It uses the tRPC framework (typescript remote procedure calls) for calls to the server
and Supabase as its database. Additional add-ons/libraries include tailwindCSS, React-hot-toast, and LuciaAuth

- ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
- ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
- ![Amazon S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white)
- ![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)


## Getting Started

If you'd like to run Birdfeed locally, follow these steps:

## Prerequisites
ensure you have the following installed on your computer
* node.js
* Yarn

# Installation
1. clone this repository
2. install dependencies
3. configure and store the following api keys in a .env file(you can create them at their respective links)

  
openai: https://platform.openai.com/docs/quickstart </br>
OPENAI_API_KEY=""


supabase: https://supabase.com/ </br>
DATABASE_URL="" </br>
DIRECT_URL=""


google: https://console.cloud.google.com </br>
GOOGLE_CLIENT_ID="" </br>
GOOGLE_CLIENT_SECRET="" </br>

aws:  https://aws.amazon.com/s3/ </br>
NEXT_PUBLIC_S3_BUCKET_NAME="" </br>
S3_ACCESS_KEY="" </br>
S3_SECRET_KEY </br>
</br>
4. That's it, now to start a local development server, run the following command:
   ```
   yarn dev
   ```

### contact
feel free to reach out to me on X [@lukegriggs6](https://x.com/LukeGriggs6) if you have any questions
