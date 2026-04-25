def log_event(file, data):
    with open(file, "a") as f:
        f.write(str(data) + "\n")