import torch

def encode(data):
    return torch.tensor(list(data.values()), dtype=torch.float32)