interface usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
export interface CompletePrompt {
  model: string;
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
}

export interface CompletePromptResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: string;
    finish_reason: string;
  }[];
  usage: usage;
}

export interface EditPrompt {
  model: string;
  input?: string;
  instruction: string;
  temperature?: number;
}

export interface EditPromptResponse {
  object: string;
  created: number;
  choices: {
    text: string;
    index: number;
  }[];
  usage: usage;
}
