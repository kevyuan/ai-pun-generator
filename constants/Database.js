// import { Ollama } from 'ollama'

const puns = [
  {
    "setup": "When a clock is hungry...",
    "punchline": "It goes back four seconds."
  },
  {
    "setup": "What did the Confederate soldiers used to eat off of?",
    "punchline": "Civil ware."
  },
  {
    "setup": "What is the leading cause of divorce in long-term marriages?",
    "punchline": "A stalemate."
  },
  {
    "setup": "A book just fell on my head.",
    "punchline": "I only have my shelf to blame."
  },
  {
    "setup": "It doesn\'t matter how much you push the envelope.",
    "punchline": "It\'ll still be stationary."
  },
];

// const context = []

const getPun = () => {
  const pun = puns[Math.floor(Math.random() * puns.length)]
  console.log(pun)
  return pun
};

// Use the Ollama class to generate a pun
// This doesn't work for mobile devices because it needs fs
const getGeneratedPun_old = async () => {
  console.log("start run")
  console.log(prompt)

  const ollama = new Ollama({ host: 'http://192.168.1.250:11434' })
  const response = await ollama.chat({
    model: 'codellama',
    // messages: [{ role: 'user', content: "Below are 5 witty puns that are defined by using this \"setup\" and \"punchline\" pattern:\n\n{setup:'When a clock is hungry...', punchline:'It goes back four seconds.'}\n{setup:'What did the Confederate soldiers used to eat off of?', punchline:'Civil ware.'}\n{setup:'What is the leading cause of divorce in long-term marriages?', punchline:'A stalemate.'}\n{setup:'A book just fell on my head.', punchline:'I only have my shelf to blame.' }\n{setup:'It doesn\\'t matter how much you push the envelope.', punchline:'It\\'ll still be stationary.'}\n\nGenerate 1 more pattern in JSON format. Use the keys \"setup\" and \"punchline\". Do not reuse any of the examples. Do not return anything besides the examples. " }],
    // messages: [{ role: 'user', content: "Hello" }],
    messages: [{ role: 'user', content: prompt }],
  })
  console.log(response.message.content);
  const pun = JSON.parse(response.message.content)
  // const pun = response.messages[0].content;
  // const pun = {
  //   setup: 'It doesn\'t matter how much you push the envelope.',
  //   punchline: 'It\'ll still be stationary.'
  // }
  return pun
}

// Call the Ollama API to generate a pun
const getGeneratedPun = async () => {
  console.log("start run")
  console.log(puns.length)

  // I think the proper way to carry a conversation over is to pass the context as a parameter... 
  // https://github.com/ollama/ollama/blob/main/docs/api.md
  // Check whether context is an empty array
  // if (context.length === 0) {
  //   console.log("context is empty")
  // } else {
  //   console.log("context is not empty")
  // }

  // Build the prompt
  // const prompt = "Below are witty puns that are defined by using this \"setup\" and \"punchline\" pattern:\n\n{\"setup\":\"When a clock is hungry...\", \"punchline\":\"It goes back four seconds.\"}\n{\"setup\":\"What did the Confederate soldiers used to eat off of?\", \"punchline\":\"Civil ware.\"}\n{\"setup\":\"What is the leading cause of divorce in long-term marriages?\", \"punchline\":\"A stalemate.\"}\n{\"setup\":\"A book just fell on my head.\", \"punchline\":\"I only have my shelf to blame.\" }\n{\"setup\":\"It doesn't matter how much you push the envelope.\", \"punchline\":'It'll still be stationary.\"}\n\nGenerate 1 more pattern in JSON format. Use the keys \"setup\" and \"punchline\". Do not reuse any of the examples. Do not return anything besides the examples. "

  // Build the prompt
  const prompt = "Below are examples of witty puns that are defined by using this \"setup\" and \"punchline\" pattern:\n\n" + 
    JSON.stringify(puns) + "\n\n" +
    "Create one more witty pun. \n" + 
    "You must return the result as a JavaScript object and nothing else. \n" +
    "You must use the keys \"setup\" and \"punchline\". \n" + 
    "The result must look like this: {\"setup\":\"When a clock is hungry...\", \"punchline\":\"It goes back four seconds.\"} \n" +
    "The result must not have any addition text before it. \n" +
    "The result must not have any addition text after it. \n" +
    "Do not reuse any of the examples. \n"
  
  console.log(prompt)

  const response = await fetch('http://192.168.1.250:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3',
      prompt: prompt,
      stream: false,
    }),
  });
  const data = await response.json();

  console.log(data.response);
  

  // I think the proper way to carry a conversation over is to pass the context as a parameter... 
  // https://github.com/ollama/ollama/blob/main/docs/api.md
  // console.log(data.context);
  // context = data.context;


  
  const pun = JSON.parse(data.response)
  puns.push(pun)
  return pun
}


export { getPun }
export { getGeneratedPun }