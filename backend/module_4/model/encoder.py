# import torch

# def encode(data):
#     return torch.tensor(list(data.values()), dtype=torch.float32)













import torch

def encode(data):
    keys = ["typing_speed", "mouse_speed", "idle_time", "copy_paste", "window_switch"]
    return torch.tensor([float(data.get(k, 0)) for k in keys], dtype=torch.float32)