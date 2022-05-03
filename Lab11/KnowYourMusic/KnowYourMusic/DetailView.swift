//
//  DetailView.swift
//  KnowYourMusic
//
//  Created by Tobias Ritscher on 01.03.22.
//

import SwiftUI
import AVKit

class SoundManager : ObservableObject {
    var audioPlayer: AVPlayer?

    func playSound(sound: String){
        if let url = URL(string: sound) {
            self.audioPlayer = AVPlayer(url: url)
        }
    }
}

struct DetailView: View {
    let item: Result
    @State var song1 = false
    @StateObject private var soundManager = SoundManager()
    
    var body: some View {
        VStack {
            AsyncImage(url: URL(string: item.artworkUrl100))
            { image in
                image.resizable()
            }
            placeholder: {
                ProgressView()
            }.frame(width: 200, height: 200)
            Text(item.trackName)
                .bold()
                .padding()
            Text(item.artistName)
                .padding()
            Image(systemName: song1 ? "pause.circle.fill": "play.circle.fill")
                .font(.system(size: 25))
                .padding(.trailing)
                .onTapGesture {
                    soundManager.playSound(sound: item.previewUrl)
                    song1.toggle()
                    
                    if song1{
                        soundManager.audioPlayer?.play()
                    } else {
                        soundManager.audioPlayer?.pause()
                    }
            }
        }
        .navigationTitle(item.trackName.split(separator: "(")[0])
    }
}

