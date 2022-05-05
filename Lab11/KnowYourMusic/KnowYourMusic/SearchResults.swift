//
//  SearchResults.swift
//  KnowYourMusic
//
//  Created by Tobias Ritscher on 01.03.22.
//

import SwiftUI

struct SearchResults: View {
    @Binding var results: [Result]
    @Binding var searchKey: String
    
    var body: some View {
            List(results, id: \.trackId) { item in
                NavigationLink(destination: DetailView(item: item, results: [])) {
                    HStack {
                        AsyncImage(url: URL(string: item.artworkUrl100))
                        { image in
                            image.resizable()
                        } placeholder: {
                            ProgressView()
                        }.frame(width: 60, height: 60)
                        VStack(alignment: .leading) {
                            Text(item.trackName).font(.headline)
                            Text(item.artistName)
                            Text(item.collectionName)
                        }
                    }
                }
            }
            .navigationTitle("Results (\(results.count))")
    }
}
