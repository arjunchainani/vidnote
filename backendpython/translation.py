import os
import time
import speech_recognition as sr

def convert_video_to_text(file):
    file_title = os.path.abspath(f'./videos/{file}')
    filename = os.path.join(file_title, '.mp4')
    # os.rename(filename + '.mp4', 'C:\\Users\\home\\OneDrive\\Desktop\\Coding\\Hackathons\\JPS-HACKS-Notes-App\\backendpython\\videos\\t.mp4')
    convert_to_mp3 = f'ffmpeg -i {file_title}.mp4 {file_title}.mp3'
    convert_to_wav = f'ffmpeg -i {file_title}.mp3 {file_title}.wav'

    os.system(convert_to_mp3)
    os.system(convert_to_wav)

    r = sr.Recognizer()
    audio = sr.AudioFile(f'{file_title}.wav')

    with audio as source:
        try:
            audio = r.record(source, duration=120)
        except FileNotFoundError:
            raise OSError('Some project dependency is missing on your computer (probably ffmpeg)')
        
        deciphered_text = r.recognize_google(audio)
    
    return deciphered_text