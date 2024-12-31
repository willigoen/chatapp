import os

def delete_pyc_and_pycache(root_dir='.'):
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Eliminar archivos .pyc
        for filename in filenames:
            if filename.endswith('.pyc'):
                file_path = os.path.join(dirpath, filename)
                print(f'Deleting file: {file_path}')
                os.remove(file_path)
        
        # Eliminar carpetas __pycache__ y su contenido
        for dirname in dirnames:
            if '__pycache__' in dirname:
                dir_path = os.path.join(dirpath, dirname)
                print(f'Deleting directory: {dir_path}')
                for root, dirs, files in os.walk(dir_path, topdown=False):
                    for file in files:
                        file_path = os.path.join(root, file)
                        print(f'Deleting file: {file_path}')
                        os.remove(file_path)
                    for dir in dirs:
                        dir_to_remove = os.path.join(root, dir)
                        print(f'Deleting directory: {dir_to_remove}')
                        os.rmdir(dir_to_remove)
                os.rmdir(dir_path)

if __name__ == '__main__':
    delete_pyc_and_pycache(root_dir='.')