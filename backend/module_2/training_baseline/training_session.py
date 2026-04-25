from baseline_builder import save_baseline

def train(user, features):
    save_baseline(user, features)
    print("Baseline created for", user)