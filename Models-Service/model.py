import warnings
import os
import logging
from transformers import AutoModelForVision2Seq, ViTImageProcessor, AutoTokenizer
import torch
from PIL import Image

# Suppress TensorFlow-related messages
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Suppress specific warnings
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

# Suppress transformers library logging (if desired)
logging.getLogger("transformers").setLevel(logging.ERROR)

# Load the model, feature extractor, and tokenizer
model = AutoModelForVision2Seq.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
feature_extractor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")

# Check device availability
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define generation parameters
max_length = 16
num_beams = 4
gen_kwargs = {"max_length": max_length, "num_beams": num_beams}

path = [""]

def predict_step(image_paths):
    images = []
    for image_path in image_paths:
        try:
            i_image = Image.open(image_path)
            print("image opened successfully !")
            if i_image.mode != "RGB":
                i_image = i_image.convert(mode="RGB")
            images.append(i_image)
        except Exception as e:
            print(f"Error loading image {image_path}: {e}")
            return ["Error loading image"]

    # Extract pixel values
    pixel_values = feature_extractor(images=images, return_tensors="pt").pixel_values
    pixel_values = pixel_values.to(device)

    # Generate attention mask (all ones since no padding here)
    attention_mask = torch.ones(pixel_values.shape[:-3], device=device)

    # Generate output ids with explicit attention mask
    output_ids = model.generate(pixel_values, attention_mask=attention_mask, **gen_kwargs)

    # Decode the generated output
    preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True, clean_up_tokenization_spaces=True)
    preds = [pred.strip() for pred in preds]
    return preds

# Run the prediction

#predict_step([])
