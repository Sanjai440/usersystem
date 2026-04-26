# from model.encoder import encode
# from model.distance import euclidean_distance

# def compare(baseline, current):
#     v1 = encode(baseline)
#     v2 = encode(current)

#     return euclidean_distance(v1, v2).item()



# from model.encoder import encode
# from model.distance import euclidean_distance

# def compare(baseline, current):
#     v1 = encode(baseline)
#     v2 = encode(current)

#     return euclidean_distance(v1, v2).item()















# from model.encoder import encode
# from model.distance import euclidean_distance

# def compare(baseline, current):
#     v1 = encode(baseline)
#     v2 = encode(current)

#     return euclidean_distance(v1, v2).item()











from model.encoder import encode
from model.model_loader import load_model
import torch

model = load_model()

def compare(baseline, current):
    v1 = encode(baseline)
    v2 = encode(current)

    with torch.no_grad():
        out1, out2 = model(v1, v2)

    distance = torch.sqrt(torch.sum((out1 - out2) ** 2))

    return distance.item()