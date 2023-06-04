# Only run if the saved_models directory is empty

import transformers
import torch
import os

model = transformers.AutoModelForCausalLM.from_pretrained('bigscience/bloomz-1b1')
model.save_pretrained('./../saved_models/')