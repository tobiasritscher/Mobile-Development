//
//  SearchView.swift
//  KnowYourAnimal
//
//  Created by Tobias Ritscher on 25.02.22.
//

import SwiftUI

struct SearchView: View {
    @State private var interpret: String = ""
    @State private var text = ""
    
    @Binding var results: [Result]
    
    var body: some View {
        HStack {
            Text("Interpret: ")
            TextField("type here...", text: $interpret)
        }.padding()
        
        Button("Search"){
            print("Button pressed")
            text = "loading...."
            Task.init {
                if await loadData(interpret: interpret) {
                    text = "success"
                } else {
                    text = "failed: wrong URL or invalid Data"
                }
            }
        }
        
        Text(text)
    }
    
    
    func loadData(interpret: String) async -> Bool {
        let interpretCorrected = interpret.replacingOccurrences(of: " ", with: "+")
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
}



struct Response: Codable {
    var results: [Result]
}

struct Result: Codable {
    var trackId: Int
    var trackName: String
    var collectionName: String
}

