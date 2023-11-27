const { createChat,CancelledCompletionError } = require("completions")

const chat = createChat({
    apiKey: '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',
    model: "gpt-3.5-turbo-0613",
    functions: [
      {
        name: "sum_of_two_numbers",
        description: "Calculate the sum of two integers",
        parameters: {
          type: "object",
          properties: {
            firstNumber: {
              type: "integer",
              description: "The first integer",
            },
            secondNumber: {
              type: "integer",
              description: "The second integer",
            },
          },
          required: ["firstNumber", "secondNumber"],
        },
        function: async ({ firstNumber, secondNumber }) => {
          const sum = firstNumber + secondNumber;
          return {
            result: sum,
          };
        },
      },
    ],
    functionCall: "auto",
  });
  
  const response = chat.sendMessage("What is the sum of 6 and 8?");

console.log(response.content);