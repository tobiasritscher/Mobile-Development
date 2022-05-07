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
    @State var hasFinished = false

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
    @State var results: [Titel]
    
    var body: some View {
        VStack {
            if item.wrapperType != "artist" {
                ZStack {
                    AsyncImage(url: URL(string: item.artworkUrl100 ?? "questionmark.circle.fill"))
                    { image in
                        image.resizable()
                    }
                    placeholder: {
                        ProgressView()
                    }.frame(width: 200, height: 200)
                    
                    if item.wrapperType == "track" {
                        Image(systemName: song1 ? "pause.circle.fill": "play.circle.fill")
                        .font(.system(size: 60))
                        .onTapGesture {
                            soundManager.playSound(sound: item.previewUrl ?? "missing info")
                            song1.toggle()
                            
                            if song1{
                                soundManager.audioPlayer?.play()
                            } else {
                                soundManager.audioPlayer?.pause()
                            }
                        }
                    }
                }.padding()
            }
            Text(item.trackName ?? item.collectionName ?? item.artistName ?? "missing data")
                .bold().font(.system(size: 25))
            if item.wrapperType != "artist" {
                Text(item.artistName ?? "missing info").padding()
            }
            if item.wrapperType == "collection" {
                GroupBox {
                    List(results.indices, id: \.self) { index in
                        NavigationLink(destination: DetailView(item: item, results: [])) {
                            VStack(alignment: .leading) {
                                Text("\(index + 1)   \(results[index].trackName ?? "missing data")")
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle((item.trackName ?? item.collectionName ?? item.artistName ?? "missing data").split(separator: "(")[0]).padding()
        .onAppear() {
            results.removeAll()
            Task.init {
                if item.wrapperType == "collection" {
                    if await loadData() {
                        print("success")
                        if results.count > 0 && results[0].trackName == nil {
                            results.remove(at: 0)
                        }
                    } else {
                        print("failed")
                    }
                }
            }
        }
    }
    
    func loadData() async -> Bool {
        guard let url = URL(string: "https://itunes.apple.com/lookup?id=\(item.collectionId!)&entity=song") else {
            print("Invalid URL")
            return false
        }
        do {
            print("loading data")
            let (data, _) = try await URLSession.shared.data(from: url)
            
            if let decodedResponse = try? JSONDecoder().decode(TitelResponse.self, from: data) {
                results = decodedResponse.results
                print(results)
            }
            return true
        } catch {
            print("Invalid data")
            return false
        }
    }
}

struct TitelResponse: Codable {
    var results: [Titel]
}

struct Titel: Codable {
    var artistId: Int
    var trackId: Int?
    var trackName: String?
}

