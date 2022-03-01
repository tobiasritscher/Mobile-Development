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
        NavigationView {
            List(results, id: \.trackId) { item in
                NavigationLink(destination: DetailView(item: item)) {
                    VStack(alignment: .leading) {
                        Text(item.trackName).font(.headline)
                        Text(item.collectionName)
                    }
                }
            }
        }.navigationTitle("\(results.count) Results")
    }
}
