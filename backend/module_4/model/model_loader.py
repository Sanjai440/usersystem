from model.siamese_network import SiameseNetwork

def load_model():
    model = SiameseNetwork()
    model.eval()
    return model