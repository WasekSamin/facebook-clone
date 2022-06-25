from datetime import datetime

# Return datetime in string format
def get_current_datetime():
    dt = datetime.now()
    dt = datetime.strftime(dt, "%d %b, %Y %I:%M:%S %p")
    return dt