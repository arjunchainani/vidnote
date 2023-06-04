import os
import time
import speech_recognition as sr

def convert_video_to_text(file):
    filename = os.path.join('C:\\Users\\home\\OneDrive\\Desktop\\Coding\\Hackathons\\JPS-HACKS-Notes-App\\backendpython\\videos', file)
    os.rename(filename + '.mp4', 'C:\\Users\\home\\OneDrive\\Desktop\\Coding\\Hackathons\\JPS-HACKS-Notes-App\\backendpython\\videos\\t.mp4')
    filename = "C:\\Users\\home\\OneDrive\\Desktop\\Coding\\Hackathons\\JPS-HACKS-Notes-App\\backendpython\\videos\\t"
    convert_to_mp3 = f'ffmpeg -i {filename}.mp4 {filename}.mp3'
    convert_to_wav = f'ffmpeg -i {filename}.mp3 {filename}.wav'

    os.system(convert_to_mp3)
    os.system(convert_to_wav)

    r = sr.Recognizer()
    audio = sr.AudioFile(f'{filename}.wav')

    with audio as source:
        audio = r.record(source, duration=120)
        deciphered_text = r.recognize_google(audio)
    
    return deciphered_text