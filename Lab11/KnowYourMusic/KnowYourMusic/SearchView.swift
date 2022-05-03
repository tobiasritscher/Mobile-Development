//
//  SearchView.swift
//  KnowYourMusic
//
//  Created by Tobias Ritscher on 25.02.22.
//

import SwiftUI

struct SearchView: View {
    @State private var interpret: String = ""
    @State private var text = ""
    @State private var searchText = "type here..."
    @State private var selection: String? = nil
    
    @Binding var results: [Result]
    
    var body: some View {
        NavigationView{
            VStack{
                NavigationLink(destination: SearchResults(results: $results, searchKey: $interpret), tag: "results", selection: $selection) { EmptyView() }
                HStack {
                    Text("Keyword: ")
                    TextField(searchText, text: $interpret).onSubmit {
                        search()
                    }
                }.padding()
                
                Button("Search"){
                    print("Button pressed")
                    search()
                }
                .padding(.vertical, 5.0)
                
                Text(text)
            }.padding()
        }.task {
            text = ""
            searchText = "type here..."
        }
    }
    
    func search() {
        text = "loading...."
        Task.init {
            if await loadData() {
                if results.count > 0 {
                    selection = "results"
                } else {
                    text = "No Results found :("
                }
            } else {
                text = "failed: wrong URL or invalid Data"
            }
        }
    }
    
    
    func loadData() async -> Bool {
        let interpretCorrected = clearSearch(searchValue: interpret)
        guard let url = URL(string: "https://itunes.apple.com/search?term=\(interpretCorrected)&entity=song") else {
            print("Invalid URL")
            return false
        }
        do {
            print("loading data")
            let (data, _) = try await URLSession.shared.data(from: url)
            
            if let decodedResponse = try? JSONDecoder().decode(Response.self, from: data) {
                results = decodedResponse.results
            }
            return true
        } catch {
            print("Invalid data")
            return false
        }
    }
    
    func clearSearch(searchValue: String) -> String {
        searchValue.replacingOccurrences(of: " ", with: "+")
            .replacingOccurrences(of: "ö", with: "o")
            .replacingOccurrences(of: "ä", with: "a")
            .replacingOccurrences(of: "ü", with: "u")
    }
}


struct Response: Codable {
    var results: [Result]
}

struct Result: Codable {
    var trackId: Int
    var trackName: String
    var collectionName: String
    var artworkUrl100: String
    var previewUrl: String
    var artistName: String
    var trackViewUrl: String
}
