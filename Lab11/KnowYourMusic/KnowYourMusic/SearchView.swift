//
//  SearchView.swift
//  KnowYourMusic
//
//  Created by Tobias Ritscher on 25.02.22.
//

import SwiftUI

struct SearchView: View {
    @State private var searchValue: String = ""
    @State private var infoText = ""
    @State private var textFieldValue = "type here..."
    @State private var selection: String? = nil
    @State private var searchName = "Choose one"
    @State private var searchType = "songTerm"
    @State private var groupIsExpanded = false
    
    @Binding var results: [Result]

    var songSearch = searchKeys(name: "Song", value:"songTerm")
    var albumSearch = searchKeys(name: "Album", value:"albumTerm")
    var interpretSearch = searchKeys(name: "Interpret", value:"artistTerm")
    
    var body: some View {
        NavigationView{
            VStack{
                NavigationLink(destination: SearchResults(results: $results, searchKey: $searchValue), tag: "results", selection: $selection) { EmptyView() }
                
                HStack {
                    Text("Search Type: ")
                    GroupBox {
                        DisclosureGroup(searchName, isExpanded: $groupIsExpanded) {
                            Button(songSearch.name){
                                searchType = songSearch.value
                                searchName = songSearch.name
                                groupIsExpanded = false
                            }.foregroundColor(Color.secondary)
                            Button(albumSearch.name){
                                searchType = albumSearch.value
                                searchName = albumSearch.name
                                groupIsExpanded = false
                            }.foregroundColor(Color.secondary).padding(.vertical, 5)
                            Button(interpretSearch.name){
                                searchType = interpretSearch.value
                                searchName = interpretSearch.name
                                groupIsExpanded = false
                            }.foregroundColor(Color.secondary)
                        }
                    }.padding(.vertical, 10).background(Color.clear).foregroundColor(Color.secondary)
                }
                
                HStack {
                    Text("Keyword: ")
                    TextField(textFieldValue, text: $searchValue).onSubmit {
                        search()
                    }
                }.padding()
                
                Button("Search"){
                    search()
                }
                .padding(.vertical, 10)
                
                Text(infoText)
                if infoText == "loading...." {
                    ProgressView()
                }
            }.padding().task {
                infoText = ""
                textFieldValue = "type here..."
            }
        }
    }
    
    func search() {
        infoText = "loading...."
        Task.init {
            if await loadData() {
                if results.count > 0 {
                    selection = "results"
                } else {
                    infoText = "No Results found :("
                }
            } else {
                infoText = "failed: wrong URL or invalid Data"
            }
        }
    }
    
    
    func loadData() async -> Bool {
        let searchValueCleaned = clearSearch(searchValue: searchValue)
        guard let url = URL(string: "https://itunes.apple.com/search?term=\(searchValueCleaned)&country=ch&media=music&attribute=\(searchType)&entity=song") else {
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

struct searchKeys {
    var name: String
    var value: String
}

struct Response: Codable {
    var results: [Result]
}

struct Result: Codable {
    var trackId: Int
    var trackName: String
    var collectionName: String
    var artworkUrl60: String
    var artworkUrl100: String
    var previewUrl: String
    var artistName: String
    var trackViewUrl: String
    var collectionId: Int
}
