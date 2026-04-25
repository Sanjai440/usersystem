from model.encoder import encode
from model.distance import euclidean_distance

def compare(baseline, current):
    v1 = encode(baseline)
    v2 = encode(current)

    return euclidean_distance(v1, v2).item()