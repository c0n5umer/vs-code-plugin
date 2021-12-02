def transformExtension(extension):
    extensions = {
        'cpp': 'cpp',
        'py': 'python',
        'js': 'javascript',
        'java': 'java',
        'c': 'c',
        'php': 'php'
    }

    try:
        res = extensions[extension]
        return res
    except KeyError as e:
        return None