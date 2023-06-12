import os
import speech_recognition as sr
import moviepy.editor as mp
from pydub import AudioSegment

def convert_video_to_text(file):
    # file_title = os.path.abspath(f'./videos/{file}')
    file_title = f'./videos/{file}'
    filename = file_title + '.mp4'
    # os.rename(filename + '.mp4', 'C:\\Users\\home\\OneDrive\\Desktop\\Coding\\Hackathons\\JPS-HACKS-Notes-App\\backendpython\\videos\\t.mp4')

    mp4_to_wav(file=filename, title=file_title)

    r = sr.Recognizer()
    audio = sr.AudioFile(f'{file_title}.wav')

    with audio as source:
        try:
            audio = r.record(source, duration=120)
        except FileNotFoundError:
            raise OSError('Some project dependency is missing on your computer (probably ffmpeg)')
        
        deciphered_text = r.recognize_google(audio)
    
    return deciphered_text

def mp4_to_wav(file, title):
    mp4_file = mp.VideoFileClip(file)
    if not os.path.exists(f'{title}.mp3'):
        mp4_file.audio.write_audiofile(f'{title}.mp3')

    wav_format = AudioSegment.from_mp3(f'{title}.mp3')
    if not os.path.exists(f'{title}.wav'):
        wav_format.export(f'{title}.wav', format='wav')