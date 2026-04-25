from pynput import mouse
from mouse_logger import log_mouse

def on_move(x, y):
    log_mouse("MOVE", f"{x},{y}")

def on_click(x, y, button, pressed):
    log_mouse("CLICK", f"{button} {pressed} {x},{y}")

def on_scroll(x, y, dx, dy):
    log_mouse("SCROLL", f"{dx},{dy}")

with mouse.Listener(on_move=on_move, on_click=on_click, on_scroll=on_scroll) as listener:
    listener.join()