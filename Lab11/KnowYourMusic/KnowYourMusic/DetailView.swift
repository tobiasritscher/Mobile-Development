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
    @State var item: Result
    @State var song1 = false
    @StateObject private var soundManager = SoundManager()
    @State var results: [Titel]
    @State var songResults: [Result]
    let titelId: Int?
    
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
                        NavigationLink(destination: DetailView(item: item, results: [], songResults: [], titelId: results[index].trackId!)) {
                            VStack(alignment: .leading) {
                                Text("\(index + 1)   \(results[index].trackName ?? "missing data")")
                            }
                        }
                    }
                }
            } else if item.wrapperType == "artist" {
                GroupBox {
                    NavigationLink(destination: SearchResults(results: results, searchType: <#T##String#>)) {
                        VStack(alignment: .leading) {
                            Text("show Titels of \(item.artistName)")
                        }
                    }
                }
            }
        }
        .navigationTitle((item.trackName ?? item.collectionName ?? item.artistName ?? "missing data").split(separator: "(")[0]).padding()
        .onAppear() {
            results.removeAll()
            Task.init {
                if titelId != nil {
                    await getTitel(id: titelId!)
                } else {
                    if item.wrapperType == "collection" {
                        if await loadData() {
                            print("success")
                            if results.count > 0 && results[0].trackName == nil {
                                results.remove(at: 0)
                            }
                        } else {
                            print("failed")
                        }
                    } else if item.wrapperType == "artist" {
                        if await loadCollections() {
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
    }
    
    func getTitel(id: Int) async {
        if await loadTitel(id: id) {
            print("success")
            if results.count > 0 && results[0].trackName == nil {
                results.remove(at: 0)
            }
        } else {
            print("failed")
        }
        item = songResults[0]
    }
    
    func loadTitel(id: Int) async -> Bool {
        guard let url = URL(string: "https://itunes.apple.com/lookup?id=\(id)&entity=song") else {
            print("Invalid URL")
            return false
        }
        do {
            print("loading data")
            let (data, _) = try await URLSession.shared.data(from: url)
            
            if let decodedResponse = try? JSONDecoder().decode(Response.self, from: data) {
                songResults = decodedResponse.results
                print(songResults)
            }
            return true
        } catch {
            print("Invalid data")
            return false
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
    
    func loadCollections() async -> Bool {
        guard let url = URL(string: "https://itunes.apple.com/lookup?id=\(item.artistId!)&entity=album") else {
            print("Invalid URL")
            return false
        }
        do {
            print("loading data")
            let (data, _) = try await URLSession.shared.data(from: url)
            
            if let decodedResponse = try? JSONDecoder().decode(Response.self, from: data) {
                songResults = decodedResponse.results
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
    var wrapperType: String!
    var artistId: Int
    var trackId: Int?
    var trackName: String?
}

