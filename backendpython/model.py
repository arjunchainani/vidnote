import transformers
import torch
import os

class ConciseSummarizerModel:
    def __init__(self) -> None:
        # Device configuration
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        torch.set_default_tensor_type(torch.cuda.FloatTensor if torch.cuda.is_available() else torch.FloatTensor)

        # Getting model and tokenizer
        self.model = transformers.AutoModelForCausalLM.from_pretrained('./../saved_models/', use_cache=True).to(self.device)
        self.tokenizer = transformers.AutoTokenizer.from_pretrained('bigscience/bloomz-3b')
        assert self.model.__class__.__name__ == 'BloomForCausalLM', 'Model did not install properly'
        
    def summarize(self, text, max_len=5000):
        # Initializing prompt
        prompt = f'{text}. Summarize the previous information in concise sentences: '

        # Tokenizing prompt
        input_ids = self.tokenizer(prompt, return_tensors='pt').to(self.device)
        
        # Passing in tokens to model
        untokenized_summary = self.model.generate(
            **input_ids,
            max_length=max_len,
            num_beams=3,
            num_return_sequences=3,
            early_stopping=False
        )

        return untokenized_summary

    def untokenize(self, tokens):
        untokenized = []
        model_responses = []
        
        # Decoding tokenized model outputs
        for num_sequence, summary in enumerate(tokens):
            untokenized.append(self.tokenizer.decode(tokens[num_sequence], skip_special_tokens=True))

        # Getting just the model response and ignoring the original prompt
        for sentence in untokenized:
            split_sentence = sentence.split('sentences: ')
            model_responses.append(split_sentence[-1])

        return max(model_responses, key=len)
    
    def format(self, summary):
        points = summary.split('. ')

        bulleted = []
        for index, point in enumerate(points):
            bulleted.append(f'{index + 1}. ' + point)
        
        formatted = '\n'.join(bulleted)

        return formatted
        
if __name__ == '__main__':
    # print(f'Current Device: {device}')

    model = ConciseSummarizerModel()

    with open(os.path.join(os.path.dirname(__file__), 'examples/english_test.txt')) as f:
        lecture = f.read()
    
    tokenized = model.summarize(lecture).to(model.device)
    summary = model.untokenize(tokenized)
    formatted_summary = model.format(summary)
    print(formatted_summary)