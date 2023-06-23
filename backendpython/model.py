import transformers
import torch
import os
from typing import List
from punctuators.models import PunctCapSegModelONNX

class ConciseSummarizerModel:
    def __init__(self, pipeline: bool = True) -> None:
        # Whether to use the pipeline approach with the BART model or to use BigScience's BLOOM
        self.use_pipeline = pipeline
        
        # Device configuration
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        torch.set_default_tensor_type(torch.cuda.FloatTensor if torch.cuda.is_available() else torch.FloatTensor)

        # Getting model and tokenizer
        if not self.use_pipeline:
            self.model = transformers.AutoModelForCausalLM.from_pretrained('./../saved_models/', use_cache=True).to(self.device)
            self.tokenizer = transformers.AutoTokenizer.from_pretrained('./../saved_models/tokenizers')
            assert self.model.__class__.__name__ == 'BloomForCausalLM', 'Model did not install properly'
    
    def pipeline_summary(self, text: str) -> str:
        if self.use_pipeline:
            self.punctuator = PunctCapSegModelONNX.from_pretrained('pcs_en')

            input_texts: List[str] = [text]

            results: List[List[str]] = self.punctuator.infer(input_texts)

            formatted_output = []

            for input, output in zip(input_texts, results):
                for val in output:
                    formatted_output.append(val)
            
            final = ' '.join(formatted_output)
            final = final.replace('<unk>', '')
            final = final.replace('<Unk>', '')
            
            self.pipeline = transformers.pipeline('summarization', model='./../saved_models/pipelines/')
            
            # with torch.no_grad:
            summarized = self.pipeline(final)
            return summarized[0]['summary_text']

    def summarize(self, text, max_len=5000) -> torch.IntTensor:
        # Initializing prompt
        prompt = f'{text}. Summarize the previous information in concise sentences: '

        print('DEBUG: Tokenizing')
        # Tokenizing prompt
        input_ids = self.tokenizer(prompt, return_tensors='pt').to(self.device)
        
        print('DEBUG: Generating')
        # Passing in tokens to model
        untokenized_summary = self.model.generate(
            **input_ids,
            max_length=max_len,
            num_beams=3,
            num_return_sequences=3,
            early_stopping=False
        )

        return untokenized_summary

    def untokenize(self, tokens: torch.IntTensor) -> str:
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
    
    def format(self, summary: str) -> str:
        points = summary.split('. ')

        bulleted = []
        for index, point in enumerate(points):
            bulleted.append(f'{index + 1}. ' + point)
        
        formatted = '\n\n'.join(bulleted)

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