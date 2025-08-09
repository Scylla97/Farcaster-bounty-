import { createFrames } from 'frames.js/next';

const frames = createFrames();
const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div style={{ color: 'white', background: 'black', padding: 20 }}>
        {ctx.message?.inputText 
          ? `Decrypted: ${decrypt(ctx.message.inputText)}`
          : 'Send encoded text to decrypt'}
      </div>
    ),
    textInput: "Paste encoded text",
    buttons: [
      {
        action: 'post',
        label: 'Decrypt'
      }
    ]
  };
});

function decrypt(text: string): string {
  // Implement your decryption logic here
  return text.split('').reverse().join(''); // Contoh sederhana
}

export const GET = handleRequest;
export const POST = handleRequest;
