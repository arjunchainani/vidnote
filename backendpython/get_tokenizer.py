from transformers import AutoTokenizer
import torch

tokenizer = AutoTokenizer.from_pretrained('bigscience/bloomz-3b')
tokenizer.save_pretrained('./../saved_models/tokenizers')