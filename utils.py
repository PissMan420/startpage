import re

def test(regex, test_str, flags=None) -> bool:
    """
    Check if `test_str` matche with `regex`.
    regex: The regular expression to use
    test_str: The string to test on the regular expression `regex`.
    flags: The regex flags to pass.
    Returns: True if the regex match.
    """
    if not flags: flags = []
    re_flags = 0
    for flag in flags: re_flags |= flag
    matches = re.finditer(regex, test_str, re_flags)
    for match in matches:
        return True
    return False

